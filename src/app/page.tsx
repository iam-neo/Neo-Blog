import { HeroSection } from "@/app/sections/hero-section";
import { FeaturedPosts } from "@/app/sections/featured-posts";
import { TechStackSection } from "@/app/sections/tech-stack-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* 
        A clean, subtle divider to separate the hero section from the content.
        Uses a radial gradient to fade out at the edges.
      */}
      <div className="w-full h-px bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-border/80 via-border/20 to-transparent my-8" />

      <FeaturedPosts />

      <TechStackSection />
    </>
  );
}
