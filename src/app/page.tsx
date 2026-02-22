import { HeroSection } from "./sections/hero";
import { AboutPreview } from "./sections/about-preview";
import { FeaturedPosts } from "./sections/featured-posts";
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutPreview />
      <FeaturedPosts />
    </>
  );
}
