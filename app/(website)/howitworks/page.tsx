import React from 'react'
import HowItWorksHero from '@/component/How it works/HowItWorksHero';
import JourneySelector from '@/component/How it works/JourneySelector';
import JourneyCards from '@/component/How it works/JourneyCards';
import TrustStats from '@/component/How it works/Truststats';
import GetStarted from '@/component/How it works/GetStarted';


function HowItWorks() {
  return (
    <main>
      <HowItWorksHero />
      <JourneySelector />
      <JourneyCards />
      <TrustStats />
      <GetStarted />
    </main>
  )
}

export default HowItWorks