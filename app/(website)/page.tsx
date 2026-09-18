import Showcase from "@/component/home/showcase";
import SalesSection from "@/component/home/sales";
import HowItWorks from "@/component/home/howitworks";
import FeatureProperties from "@/component/home/features";
import Features2 from "@/component/home/features2";
import LandLord from "@/component/home/landlord";
import Testimony from "@/component/home/testimony";

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
