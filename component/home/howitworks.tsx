import React from 'react'

const HowItWorks = () => {
  return (
    <section
      id="howitworks"
      className="relative overflow-hidden bg-[#1E5A4F] pb-8 md:pb-3"
    >

      {/* Mobile house background */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center md:hidden">
        <img
          src="./house.svg"
          alt=""
          className="w-[120%] max-w-none opacity-[0.10] blur-[2px]"
        />
      </div>

      {/* Title */}
      <div className="relative z-10 ml-5 pt-6 text-center sm:ml-10 md:pt-4 md:text-left">
        <h1 className="text-2xl font-medium text-[#ffffff]">
          HOW IT WORKS
        </h1>

        <h1 className="text-xl font-medium text-[#F4B942] sm:text-2xl">
          Find or list your property in 3 simple steps
        </h1>
      </div>

      {/* Flex items container */}
      <div className="relative z-10 mx-5 flex flex-col sm:mx-3 md:flex-row lg:mx-8">

        {/* First flex item */}
        <div className="flex w-full flex-col items-center pt-10 md:w-1/5 md:items-stretch md:pt-8 lg:w-[18%] lg:items-center">
          <img
            src="./searchicon.svg"
            alt="searchicon"
            className="h-9 w-9 md:ml-25 lg:ml-0"
          />

          <h1 className="pt-2 text-center text-[#F4B942]">
            Search List
          </h1>

          <p className="text-center text-[#ffffff]">
            Search verified properties <br className="hidden md:block" />
            or list your property <br className="hidden md:block" />
            in minutes.
          </p>
        </div>

        {/* 2nd flex item */}
        <div className="flex w-full flex-col items-center pt-10 md:w-1/5 md:items-stretch md:pt-8 lg:w-[18%] lg:items-center">
          <img
            src="./messageicon.svg"
            alt="messageicon"
            className="h-9 w-9 md:ml-25 lg:ml-0"
          />

          <h1 className="pt-2 text-center text-[#F4B942]">
            Connect
          </h1>

          <p className="text-center text-[#ffffff]">
            Chat directly with landlords <br className="hidden md:block" />
            or tenants. No middlemen, <br className="hidden md:block" />
            no stress.
          </p>
        </div>

        {/* 3rd flex item */}
        <div className="flex w-full flex-col items-center pt-10 md:w-1/5 md:items-stretch md:pt-8 lg:w-[18%] lg:items-center">
          <img
            src="./dealicon.svg"
            alt="closethedealicon"
            className="h-9 w-9 md:ml-25 lg:ml-0"
          />

          <h1 className="pt-2 text-center text-[#F4B942]">
            Close the deal
          </h1>

          <p className="text-center text-[#ffffff]">
            Schedule inspection, <br className="hidden md:block" />
            make payment, move in <br className="hidden md:block" />
            or get your tenant.
          </p>
        </div>

        {/* 4th flex item - Why SpatialHunt */}
        <div className="flex w-full flex-col items-center pt-12 md:w-1/5 md:items-stretch md:pt-0 lg:w-[23%] lg:pl-6">

          <h1 className="mb-3 text-center text-2xl font-medium text-[#F4B942] md:text-left">
            Why SpatialHunt?
          </h1>

          {/* list 1 */}
          <div className="mt-3 flex">
            <img
              src="./goodicon.svg"
              alt="good-icon"
              className="h-5 w-5 shrink-0"
            />
            <h3 className="pl-2 text-white">
              100% Verified Landlords
            </h3>
          </div>

          {/* list 2 */}
          <div className="mt-3 flex">
            <img
              src="./goodicon.svg"
              alt="good-icon"
              className="h-5 w-5 shrink-0"
            />
            <h3 className="pl-2 text-white">
              Direct Communication
            </h3>
          </div>

          {/* list 3 */}
          <div className="mt-3 flex">
            <img
              src="./goodicon.svg"
              alt="good-icon"
              className="h-5 w-5 shrink-0"
            />
            <h3 className="pl-2 text-white">
              Transparent & Secure
            </h3>
          </div>

          {/* list 4 */}
          <div className="mt-3 flex">
            <img
              src="./goodicon.svg"
              alt="good-icon"
              className="h-5 w-5 shrink-0"
            />
            <h3 className="pl-2 text-white">
              Built for Sustainability
            </h3>
          </div>
        </div>

        {/* 5th flex item - Desktop house */}
        <div className="hidden w-1/5 justify-center pt-0 md:flex lg:w-[23%] lg:justify-end lg:pr-4">
          <img
            src="./house.svg"
            alt="house-illustration"
            className="h-auto w-full max-w-[250px] lg:max-w-[280px]"
          />
        </div>

      </div>

    </section>
  )
}

export default HowItWorks