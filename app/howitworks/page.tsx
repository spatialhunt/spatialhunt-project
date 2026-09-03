import React from 'react'
import HowItWorksHero from '@/component/howitworks/HowItWorksHero'
import JourneySelector from '@/component/howitworks/JourneySelector'
import JourneyCards from '@/component/howitworks/JourneyCards'
import TrustStats from '@/component/howitworks/Truststats'
import GetStarted from '@/component/howitworks/GetStarted'

const HowItWorks = () => {
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