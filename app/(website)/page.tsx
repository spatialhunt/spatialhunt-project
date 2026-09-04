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
      <div>
        <Showcase />
        <Showsection />
        <SalesSection />
        <HowItWorks />
        <FeatureProperties />
        <Features2 />
        <LandLord />
        <Testimony />
      </div>
      
    </>
  )
}

export default Page;