import React from 'react'
import Header from '@/component/header'
import Showcase from "@/component/home/showcase";
import Showsection from '@/component/home/show';
import SalesSection from '@/component/home/sales';

const page = () => {
  return (
    <div>
      <Showcase />
      <Showsection />
      <SalesSection />
    </div>
  )
}

export default page