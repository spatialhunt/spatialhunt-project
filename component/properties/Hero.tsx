import React from 'react'
import Link from 'next/link'

const Hero = () => {
  return (
    <section className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-4">
      
      <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        
        {/* Left side */}
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-[#2E2E2E] sm:text-2xl md:text-3xl">
            Find Properties
          </h1>

          <p className="mt-1 text-sm text-[#2E2E2E] sm:text-base">
            Find verified homes that fit your lifestyle.
          </p>
        </div>

        {/* Right side - View on Map */}
        <Link
          href="/properties/map"
          className="flex w-fit items-center gap-2 rounded-[0.5rem] border border-[#1E5A4F] px-3 py-2 text-sm text-[#1E5A4F] transition-colors hover:bg-[#1E5A4F] hover:text-white sm:px-4 sm:py-2"
        >
          <img
            src="/mapicon.svg"
            alt="Map"
            className="h-5 w-5"
          />

          <span>View on Map</span>
        </Link>

      </div>
    </section>
  )
}

export default Hero