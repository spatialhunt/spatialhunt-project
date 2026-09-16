
import React from "react";

const FeatureProperties = () => {
  return (
    <section className="mx-0 mt-10 bg-[#F7F7F7] px-5 py-8 sm:px-6 md:mx-10 md:mt-13 md:bg-transparent md:px-0 md:py-0 lg:mx-10 xl:mx-12">
      
      {/* Title */}
      <h1 className="ml-0 pb-5 text-center text-2xl font-bold text-[#1E5A4F] sm:text-3xl md:ml-4 md:text-left md:text-2xl lg:text-2xl">
        FEATURED PROPERTIES
      </h1>

      {/* Properties */}
      <div className="flex flex-col items-center gap-8 sm:gap-10 md:flex-row md:items-start md:justify-between md:gap-4 lg:gap-8">

        {/* Property 1 */}
        <div className="flex w-full justify-center md:w-1/3">
          <div className="flex w-full max-w-[360px] flex-col">
            <img
              src="/property-one.svg"
              alt="property 1"
              className="h-auto w-full"
            />

            <span className="pt-2">
              <img
                src="/property1.svg"
                alt="property 1 details"
                className="h-auto w-full max-w-[275px]"
              />
            </span>
          </div>
        </div>

        {/* Property 2 */}
        <div className="flex w-full justify-center md:w-1/3">
          <div className="flex w-full max-w-[360px] flex-col">
            <img
              src="/property-two.svg"
              alt="property 2"
              className="h-auto w-full"
            />

            <span className="pt-2">
              <img
                src="/property2.svg"
                alt="property 2 details"
                className="h-auto w-full max-w-[275px]"
              />
            </span>
          </div>
        </div>

        {/* Property 3 */}
        <div className="flex w-full justify-center md:w-1/3">
          <div className="w-full max-w-[360px]">
            <img
              src="/property3.svg"
              alt="property 3"
              className="h-auto w-full"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default FeatureProperties;

