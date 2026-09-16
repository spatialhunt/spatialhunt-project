import Showcase from "@/component/Home/ShowCase";
import Showsection from '@/component/Home/Show';
import SalesSection from '@/component/Home/Sales';
import HowItWorks from '@/component/Home/HowItWorks';
import FeatureProperties from '@/component/Home/Features';
import Features2 from '@/component/Home/Features2';
import LandLord from '@/component/Home/LandLord';
import Testimony from '@/component/Home/Testimony';


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