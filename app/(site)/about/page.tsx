"use client";

import dynamic from "next/dynamic";
import Statistics from "@/components/about/Statistics";
import Features from "@/components/about/Features";
import Testimonials from "@/components/about/Testimonials";

const HeroSlider = dynamic(() => import("@/components/about/HeroSlider"), {
  ssr: false,
});

const OurStory = dynamic(() => import("@/components/about/OurStory"), {
  ssr: false,
});

export default function AboutContent() {
  return (
    <>
      <HeroSlider />
      <OurStory />
      <Statistics />
      <Features />
      <Testimonials />
    </>
  );
}