import Footer from "@/components/Footer";
import Header from "@/component/header";
import Showcase from "@/component/home/showcase";
import Showsection from "@/component/home/show";
import SalesSection from "@/component/home/sales";
import HowItWorks from "@/component/home/howitworks";
import FeatureProperties from "@/component/home/features";

const Page = () => {
  return (
    <>
      <Header />

      <main>
        <Showcase />
        <Showsection />
        <SalesSection />
        <HowItWorks />
        <FeatureProperties />
      </main>

      <Footer />
    </>
  );
};

export default Page;