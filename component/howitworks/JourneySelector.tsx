import React from 'react'

function JourneySelector() {
  return (
    <section className="w-full px-6 py-16">
      <div className="mx-auto max-w-[1440px] text-center flex flex-col items-center">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-[#333333]">
          Choose your journey
        </h2>

        <p className="mt-1 text-sm text-[#333333]">
          Select how you want to use SpatialHunt and follow the simple steps.
        </p>

        {/* Journey Tabs */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-5">
          {/* For Tenants */}
          <button
            type="button"
            className="flex h-[35px] w-[164px] items-center justify-center gap-2 rounded-md bg-[#1E5A4F] text-sm font-medium text-white"
          >
            <img src="/iconamoon_profile-light.svg" className="h-4 w-4" />
            <span>For Tenants</span>
          </button>

          {/* For Landlords */}
          <button
            type="button"
            className="flex h-[35px] w-[164px] items-center justify-center gap-2 rounded-md border border-[#777777] bg-white text-sm font-medium text-[#333333]"
          >
            <img src="/lucide_house.svg" className="h-4 w-4" />
            <span>For Landlords</span>
          </button>

          {/* For Agents */}
          <button
            type="button"
            className="flex h-[35px] w-[164px] items-center justify-center gap-2 rounded-md border border-[#777777] bg-white text-sm font-medium text-[#333333]"
          >
            <img src="/briefcase.svg" className="h-4 w-4" />
            <span>For Agents</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default JourneySelector