import HeroSection from "@/components/home/HeroSection";
import CompanyLogos from "@/components/home/CompanyLogos";
import CategorySection from "@/components/home/CategorySection";
import FeaturedJobs from "@/components/home/FeaturedJobs";
import LatestJobs from "@/components/home/LatestJobs";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CompanyLogos />
      <CategorySection />
      <CTASection />
      <FeaturedJobs />
      <LatestJobs />
      
    </>
  );
}
