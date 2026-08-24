import Footer from "@/components/Footer";
import Header from "@/component/header";
import Showcase from "@/component/home/showcase";
import Showsection from '@/component/home/show';
import SalesSection from '@/component/home/sales';
import HowItWorks from '@/component/home/howitworks';
import FeatureProperties from '@/component/home/features';
import Features2 from '@/component/home/features2';
import LandLord from '@/component/home/landlord';
import Testimony from '@/component/home/testimony';


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
        <Features2 />
        <LandLord />
        <Testimony />
      </main>
      <Footer />
    </>
  )
}

export default Page;