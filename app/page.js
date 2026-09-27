import Hero from "@/components/home/Hero";
import Manifesto from "@/components/home/Manifesto";
import StandFor from "@/components/home/StandFor";
import Founder from "@/components/home/Founder";
import Programmes from "@/components/home/Programmes";
import GalleryRail from "@/components/home/GalleryRail";
import JoinCta from "@/components/home/JoinCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <StandFor />
      <Founder />
      <Programmes />
      <GalleryRail />
      <JoinCta />
    </>
  );
}
