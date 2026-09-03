import React from 'react'

const Features2 = () => {
  return (
    <section className="mt-2 bg-[#1E5A4F] pb-4">
      {/* flex container */}
      <div className="flex flex-col md:flex-row lg:items-center">

        {/* 1st item */}
        <div className="flex w-full flex-col items-center text-center md:w-1/2 md:flex-row md:items-start md:text-left lg:pl-6">
          <img
            src="./gicon.svg"
            alt="gicon"
            className="ml-0 h-24 w-24 pt-8 md:ml-6 md:h-32 md:w-32 md:pt-12 lg:ml-4"
          />

          <div className="flex flex-col px-5 pl-0 md:px-0 md:pl-3 lg:pl-5">
            <h1 className="pt-6 text-xl font-bold text-[#ffffff] md:pb-2 md:pt-10 md:text-2xl">
              We verify so you can trust us
            </h1>

            <p className="mx-1 mt-3 font-medium text-[#ffffff] md:mx-0 md:mt-0">
              Every landlord and property listed on SpatialHunt,
              <br className="hidden md:block" />
              goes through a strict verification process.
              <br className="hidden md:block" />
              We cannot afford to get it wrong.
            </p>
          </div>
        </div>

        {/* 2nd item */}
        <div className="flex w-full justify-center md:block md:w-1/2 lg:flex lg:justify-center">
          <img
            src="./feature2img.svg"
            alt="feature2-img"
            className="w-full max-w-[320px] pt-8 md:max-w-none md:ml-18 md:w-120 md:pt-16 lg:ml-0 lg:w-[520px]"
          />
        </div>

      </div>
    </section>
  )
}

export default Features2
