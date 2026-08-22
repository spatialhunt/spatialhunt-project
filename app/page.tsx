import React from 'react'
import Header from '@/component/header'
import Showcase from "@/component/home/showcase";
import Showsection from '@/component/home/show';

const page = () => {
  return (
    <div>
      <Showcase />
      <Showsection />
    </div>
  )
}

export default page