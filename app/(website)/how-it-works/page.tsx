import React from 'react'
import HowItWorksHero from '@/component/how-it-works/HowItWorksHero';
import JourneySelector from '@/component/how-it-works/JourneySelector';
import JourneyCards from '@/component/how-it-works/JourneyCards';
import TrustStats from '@/component/how-it-works/TrustStats';
import GetStarted from '@/component/how-it-works/GetStarted';


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