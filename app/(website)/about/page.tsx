import React from 'react'
import type { Metadata } from 'next';
import AboutHero from '@/component/about/AboutHero';

export const metadata: Metadata = {
  title: 'About SpatialHunt',
  description:
    'Learn how SpatialHunt helps renters and landlords discover verified property opportunities in Nigeria.',
  keywords: [
    'about SpatialHunt',
    'property marketplace Nigeria',
    'trusted rental platform Nigeria',
    'landlord and renter platform',
  ],
  openGraph: {
    title: 'About SpatialHunt',
    description:
      'Learn how SpatialHunt helps renters and landlords discover verified property opportunities in Nigeria.',
    url: 'http://thespatialhunt.com/about',
    siteName: 'SpatialHunt',
    images: [
      {
        url: '/property-one.jpg',
        width: 1200,
        height: 630,
        alt: 'About SpatialHunt',
      },
    ],
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About SpatialHunt',
    description:
      'Learn how SpatialHunt helps renters and landlords discover verified property opportunities in Nigeria.',
    images: ['/property-one.jpg'],
  },
};
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