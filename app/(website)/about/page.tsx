import React from 'react'
import AboutHero from '@/component/about/AboutHero';
import MissionVisionValues from '@/component/about/MissionVisionValues';
import WhyWeExist from '@/component/about/WhyWeExist';
import GetStarted from '@/component/about/AboutGetStarted';




const AboutUs = () => {
  return (
    <main>
      <AboutHero />
      <MissionVisionValues />
      <WhyWeExist />
      <GetStarted />
    </main>
  )
}

export default AboutUs