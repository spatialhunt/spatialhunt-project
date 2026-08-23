import React from 'react'

const Testimony = () => {
  return (
    <section className="bg-[#D9D9D9] p-4">
      {/* titles */}
      <h1 className="pt-4 pl-0 text-center text-xl font-bold text-[#1E5A4F] md:pl-8 md:text-left md:text-2xl">
        WHAT OUR USERS SAY
      </h1>

      <h1 className="pl-0 text-center text-2xl font-bold md:pl-8 md:text-left md:text-3xl">
        Trusted by thousands
      </h1>

      {/* flex images */}
      <div className="flex flex-col items-center gap-5 px-1 py-5 md:flex-row md:gap-6 md:px-3">
        <img
          src="./testimony1.svg"
          alt="testimony1"
          className="h-auto w-full max-w-[385px] md:h-[186px] md:w-[385px]"
        />

        <img
          src="./testimony2.svg"
          alt="testimony2"
          className="h-auto w-full max-w-[385px] md:h-[186px] md:w-[385px]"
        />

        <img
          src="./testimony3.svg"
          alt="testimony3"
          className="h-auto w-full max-w-[385px] md:h-[186px] md:w-[385px]"
        />
      </div>
    </section>
  )
}

export default Testimony
