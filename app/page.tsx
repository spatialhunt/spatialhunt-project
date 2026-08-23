import React from 'react'
import Header from '@/component/header'
import Showcase from "@/component/home/showcase";
import Showsection from '@/component/home/show';
import SalesSection from '@/component/home/sales';
import HowItWorks from '@/component/home/howitworks';
import FeatureProperties from '@/component/home/features';

const page = () => {
  return (
    <div>
      <Showcase />
      <Showsection />
      <SalesSection />
      <HowItWorks />
      <FeatureProperties />
    </div>
  )
}

export default page