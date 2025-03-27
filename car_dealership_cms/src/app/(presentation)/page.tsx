import { FeaturesSection } from "@/components/homepage/feature-section";
import { HeroSection } from "@/components/homepage/hero-section";
import { LatestArrivals } from "@/components/homepage/latest-arrivals";
import { OurBrandsSection } from "@/components/homepage/our-brands-section";
import type { PageProps } from "@/config/types";

export default async function Home(props: PageProps) {
  const searchParams = await props.searchParams;
  return (
    <div className="w-full min-h-screen bg-background">
      <HeroSection searchParams={searchParams} />
      <FeaturesSection />
      <LatestArrivals />
      <OurBrandsSection />
    </div>
  );
}
