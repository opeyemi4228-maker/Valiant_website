import { site } from "@/lib/site";

const routes = [
  "",
  "/about",
  "/founder",
  "/pledge",
  "/ethics",
  "/membership",
  "/programmes",
  "/programmes/choir",
  "/events",
  "/gallery",
  "/join",
  "/donate",
  "/contact",
];

export default function sitemap() {
  return routes.map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: path === "/events" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/join" ? 0.9 : 0.7,
  }));
}
