import React from 'react'
import Image from "next/image";


const features = [
  {
    icon: '/icon verify.svg',
    title: '100% Verified',
    description: 'Every landlord and property is verified.',
  },
  {
    icon: '/icon communication.svg',
    title: 'Direct Communication',
    description: 'Chat directly with landlords. No agents..',
  },
  {
    icon: '/icons leaf.svg',
    title: 'Secure & Transparent',
    description: 'No hidden fees. Everything is clear..',
  },
  {
    icon: '/circum_lock.svg',
    title: 'Built for sustainability',
    description: 'We create better communities.',
  }
];

function HowItWorksHero() {
  return (
    <section className="w-full px-6 py-14 sm:px-10 lg:px-14">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:items-center">
        {/* Left: copy */}
        <div className="lg:w-[38%] lg:shrink-0">
          <p className="text-sm font-bold tracking-wide text-[#1E5A4F]">
            HOW IT WORKS
          </p>

          <h1 className="mt-3 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
            Simple Steps. Total Confidence.
            <br />
            <span className="text-[#F4B942]">Better Renting for Everyone.</span>
          </h1>

          <p className="mt-4 max-w-md text-sm leading-relaxed text-gray-600">
            SpatialHunt makes renting and property management simple,
            transparent and secure for tenants, landlords and agents.
          </p>
        </div>

        {/* Right: image */}
         <div className="flex-1 rounded-2xl bg-[#E7F2E9] px-6 py-8 sm:px-10 sm:py-10">
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
            {features.map(({ icon, title, description }) => (
              <div key={title} className="flex flex-col items-center text-center">
                <span className="mb-3 flex h-12 w-12 items-center justify-center">
                  <Image src={icon} alt="" width={32} height={32} />
                </span>
                <h3 className="text-sm font-bold text-gray-900">{title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-gray-600">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorksHero