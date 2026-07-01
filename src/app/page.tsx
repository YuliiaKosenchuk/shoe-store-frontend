import FeatureBar from "@/components/layout/FeatureBar";
import HeroV4 from "@/components/layout/HeroV4";
import CategoriesSection from "@/components/layout/CategoriesSection";
import BestsellersSection from "@/components/layout/BestsellersSection";
import DiscountsSection from "@/components/layout/DiscountsSection";
import MaterialsSection from "@/components/layout/MaterialsSection";
import EditorialsSection from "@/components/layout/EditorialsSection";
import SaleSection from "@/components/layout/SaleSection";
import SocialSection from "@/components/layout/SocialSection";

export default function Home() {
  return (
    <main>
      <HeroV4 />
      <FeatureBar />
      <CategoriesSection />
      <BestsellersSection />
      <MaterialsSection />
      <EditorialsSection />
      <SaleSection />
      <DiscountsSection />
      <SocialSection />
    </main>
  );
}
