import React from 'react'

const FeatureProperties = () => {
  return (
    <section className="mx-0 mt-10 bg-[#F7F7F7] px-5 py-8 md:mx-10 md:mt-13 md:bg-transparent md:px-0 md:py-0">

      {/* Title */}
      <h1 className="ml-0 pb-5 text-center text-2xl font-bold text-[#1E5A4F] md:ml-4 md:text-left">
        FEATURED PROPERTIES
      </h1>

      {/* Flex container */}
      <div className="flex flex-col gap-8 md:flex-row md:gap-22 lg:gap-10 lg:justify-between">

        {/* Item 1 */}
        <div className="flex w-full justify-center md:w-1/3 lg:w-auto">
          <img
            src="./property1.svg"
            alt="property 1"
            className="h-auto w-full max-w-90 md:h-55.21 md:w-82.75 lg:h-auto lg:w-[360px]"
          />
        </div>

        {/* Item 2 */}
        <div className="flex w-full justify-center md:w-1/3 lg:w-auto">
          <img
            src="./property2.svg"
            alt="property 2"
            className="h-auto w-full max-w-90 md:h-55.21 md:w-81 lg:h-auto lg:w-[360px]"
          />
        </div>

        {/* Item 3 */}
        <div className="flex w-full justify-center md:w-1/3 lg:w-auto">
          <img
            src="./property3.svg"
            alt="property 3"
            className="h-auto w-full max-w-90 md:h-55.21 md:w-82.75 lg:h-auto lg:w-[360px]"
          />
        </div>

      </div>

    </section>
  )
}

export default FeatureProperties