import { HeroSection } from "@/app/sections/hero-section";
import { FeaturedPosts } from "@/app/sections/featured-posts";

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Clean subtle divider */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full h-px bg-border/60" />
      </div>

      <FeaturedPosts />
    </>
  );
}
