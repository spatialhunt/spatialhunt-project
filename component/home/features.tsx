import React from 'react'

const FeatureProperties = () => {
  return (
    <section className="mx-0 md:mx-10 mt-10 md:mt-13 bg-[#F7F7F7] md:bg-transparent px-5 py-8 md:px-0 md:py-0">

      {/* Title */}
      <h1 className="font-bold text-2xl text-[#1E5A4F] pb-5 ml-0 md:ml-4 text-center md:text-left">
        FEATURED PROPERTIES
      </h1>

      {/* Flex container */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-22">

        {/* Item 1 */}
        <div className="w-full md:w-1/3 flex justify-center">
          <img
            src="./property1.svg"
            alt="property 1"
            className="w-full max-w-90 h-auto md:h-55.21 md:w-82.75"
          />
        </div>

        {/* Item 2 */}
        <div className="w-full md:w-1/3 flex justify-center">
          <img
            src="./property2.svg"
            alt="property 2"
            className="w-full max-w-90 h-auto md:h-55.21 md:w-81"
          />
        </div>

        {/* Item 3 */}
        <div className="w-full md:w-1/3 flex justify-center">
          <img
            src="./property3.svg"
            alt="property 3"
            className="w-full max-w-90 h-auto md:h-55.21 md:w-82.75"
          />
        </div>

      </div>

    </section>
  )
}

export default FeatureProperties
