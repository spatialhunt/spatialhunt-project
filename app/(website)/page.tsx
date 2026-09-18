import Showcase from "@/component/home/Showcase";
import SalesSection from "@/component/home/Sales";
import HowItWorks from "@/component/home/HowItWorks";
import FeatureProperties from "@/component/home/Features";
import Features2 from "@/component/home/Features2";
import LandLord from "@/component/home/Landlord";
import Testimony from "@/component/home/Testimony";

export default function Page() {
  return (
    <main className="w-full overflow-x-hidden">
      <Showcase />
      <SalesSection />
      <HowItWorks />
      <FeatureProperties />
      <Features2 />
      <LandLord />
      <Testimony />
    </main>
  );
}
