"use client";

/**
 * Fetches a state's LGAs and wards when the member picks the state, then that
 * LGA's polling units when they pick the LGA.
 *
 * Each fetch stores `{ key, data, error }` and is only used while its key still
 * matches the selection, so a member who changes state mid-fetch never sees the
 * list they abandoned.
 */

import { useEffect, useMemo, useState } from "react";
import { findLga, findWard, loadState, loadUnits, pollingUnitsFor } from "./geography";

const EMPTY = { key: null, data: null, error: false };

export function useGeography(state, lga, ward) {
  const [tree, setTree] = useState(EMPTY);
  const [units, setUnits] = useState(EMPTY);

  useEffect(() => {
    if (!state) return;
    let live = true;
    loadState(state)
      .then((data) => live && setTree({ key: state, data, error: false }))
      .catch(() => live && setTree({ key: state, data: null, error: true }));
    return () => {
      live = false;
    };
  }, [state]);

  const current = tree.key === state ? tree.data : null;
  const treeError = tree.key === state && tree.error;

  const lgaRecord = useMemo(() => findLga(current, lga), [current, lga]);
  const wardRecord = useMemo(() => findWard(current, lga, ward), [current, lga, ward]);
  const lgaCode = lgaRecord?.code ?? null;

  useEffect(() => {
    if (!lgaCode) return;
    let live = true;
    loadUnits(lgaCode)
      .then((data) => live && setUnits({ key: lgaCode, data, error: false }))
      // Polling unit is optional: a failed fetch must not block registration.
      .catch(() => live && setUnits({ key: lgaCode, data: null, error: true }));
    return () => {
      live = false;
    };
  }, [lgaCode]);

  const unitData = units.key === lgaCode ? units.data : null;
  const unitsError = units.key === lgaCode && units.error;

  return {
    lgas: useMemo(() => (current ? current.lgas.map((l) => l.name) : []), [current]),
    wards: useMemo(() => lgaRecord?.wards.map((w) => w.name) ?? [], [lgaRecord]),
    units: useMemo(() => pollingUnitsFor(unitData, wardRecord?.code), [unitData, wardRecord]),
    lgaCode,
    wardCode: wardRecord?.code ?? null,
    loading: Boolean(state) && !current && !treeError,
    unitsLoading: Boolean(lgaCode) && !unitData && !unitsError,
    error: treeError,
  };
}
