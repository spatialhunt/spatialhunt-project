import React from 'react'

const Features2 = () => {
  return (
    <section className="mt-2 pb-4 bg-[#1E5A4F]">
      {/* flex container */}
      <div className="flex flex-col md:flex-row">
        
        {/* 1st item */}
        <div className="flex w-full flex-col items-center text-center md:w-1/2 md:flex-row md:items-start md:text-left">
          <img
            src="./gicon.svg"
            alt="gicon"
            className="h-24 w-24 pt-8 md:h-32 md:w-32 md:pt-12 ml-0 md:ml-6"
          />

          <div className="flex flex-col pl-0 px-5 md:pl-3 md:px-0">
            <h1 className="text-[#ffffff] pt-6 font-bold text-xl md:pt-10 md:text-2xl md:pb-2">
              We verify so you can trust us
            </h1>

            <p className="text-[#ffffff] mx-1 font-medium mt-3 md:mt-0 md:mx-0">
              Every landlord and property listed on SpatialHunt,   
              <br className="hidden md:block" /> goes through a strict verification process. 
               <br className="hidden md:block" /> We cannot afford to get it wrong.
            </p>
          </div>
        </div>

        {/* 2nd item */}
        <div className="w-full flex justify-center md:w-1/2 md:block">
          <img
            src="./feature2img.svg"
            alt="feature2-img"
            className="pt-8 w-full max-w-[320px] md:max-w-none md:pt-16 md:ml-18 md:w-120"
          />
        </div>

      </div>
    </section>
  )
}

export default Features2