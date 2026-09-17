import React from "react";

const FeatureProperties = () => {
  return (
    <section className="mx-0 mt-10 w-full bg-[#F7F7F7] px-5 py-8 sm:px-6 md:mx-10 md:mt-13 md:w-auto md:bg-transparent md:px-0 md:py-0 lg:mx-10 xl:mx-12">

      {/* Title */}
      <h1 className="ml-0 pb-5 text-center text-2xl font-bold text-[#1E5A4F] sm:text-3xl md:ml-4 md:text-left md:text-2xl lg:text-2xl">
        FEATURED PROPERTIES
      </h1>

      {/* Properties */}
      <div className="grid w-full grid-cols-1 gap-10 sm:gap-12 md:grid-cols-2 md:gap-x-5 md:gap-y-10 lg:grid-cols-3 lg:gap-x-6 xl:gap-x-8">

        {/* Property 1 */}
        <div className="w-full min-w-0">
          <div className="mx-auto flex w-full max-w-[360px] flex-col">

            <img
              src="/property-one.svg"
              alt="2 Bedroom Apartment"
              className="h-auto w-full"
            />

            <div className="flex flex-col pt-2 text-[#2e2e2e]">

              <h1 className="text-xl font-bold">
                2 Bedroom Apartment
              </h1>

              <small className="font-medium">
                Lekki Phase 1, Lagos
              </small>

              <h1 className="pt-1">
                <span className="font-bold">#2,500,000</span>/year
              </h1>

              <div className="flex flex-wrap gap-x-4 gap-y-2 pt-1.5">

                <span className="flex shrink-0 items-center">
                  <img
                    src="/bed1.svg"
                    alt="bed icon"
                    className="h-8 w-8"
                  />
                  <h1 className="pl-1 font-bold">
                    2 beds
                  </h1>
                </span>

                <span className="flex shrink-0 items-center">
                  <img
                    src="/bathroom1.svg"
                    alt="bathroom icon"
                    className="h-8 w-8"
                  />
                  <h1 className="pl-1 font-bold">
                    2 bathrooms
                  </h1>
                </span>

                <span className="flex shrink-0 items-center">
                  <img
                    src="/services-icon.svg"
                    alt="serviced icon"
                    className="h-8 w-8"
                  />
                  <h1 className="pl-1 font-bold">
                    Serviced
                  </h1>
                </span>

              </div>
            </div>
          </div>
        </div>

        {/* Property 2 */}
        <div className="w-full min-w-0">
          <div className="mx-auto flex w-full max-w-[360px] flex-col">

            <img
              src="/property-two.svg"
              alt="4 Bedroom Duplex"
              className="h-auto w-full"
            />

            <div className="flex flex-col pt-2 text-[#2e2e2e] md:ml-2">

              <h1 className="text-xl font-bold">
                4 Bedroom Duplex
              </h1>

              <small className="font-medium">
                Asaba, Delta
              </small>

              <h1 className="pt-1">
                <span className="font-bold">#40,000,000</span>/year
              </h1>

              <div className="flex flex-wrap gap-x-4 gap-y-2 pt-1.5">

                <span className="flex shrink-0 items-center">
                  <img
                    src="/bed1.svg"
                    alt="bed icon"
                    className="h-8 w-8"
                  />
                  <h1 className="pl-1.5 font-bold">
                    4 beds
                  </h1>
                </span>

                <span className="flex shrink-0 items-center">
                  <img
                    src="/bathroom1.svg"
                    alt="bathroom icon"
                    className="h-8 w-8"
                  />
                  <h1 className="pl-1.5 font-bold">
                    5 bathroom
                  </h1>
                </span>

                <span className="flex shrink-0 items-center">
                  <img
                    src="/parking1.svg"
                    alt="parking icon"
                    className="h-8 w-8"
                  />
                  <h1 className="pl-1.5 font-bold">
                    Parking
                  </h1>
                </span>

              </div>
            </div>
          </div>
        </div>

        {/* Property 3 */}
        <div className="hidden w-full min-w-0 md:block">
          <div className="mx-auto flex w-full max-w-[360px] flex-col">

            <img
              src="/miniflat2.svg"
              alt="Mini Flat"
              className="h-auto w-full"
            />

            <div className="flex flex-col pt-2 text-[#2e2e2e] md:ml-2">

              <h1 className="text-xl font-bold">
                Mini Flat
              </h1>

              <small className="font-medium">
                Abuja, FCT
              </small>

              <h1 className="pt-1">
                <span className="font-bold">#1,200,000</span>/year
              </h1>

              <div className="flex flex-wrap gap-x-4 gap-y-2 pt-1.5">

                <span className="flex shrink-0 items-center">
                  <img
                    src="/bed1.svg"
                    alt="bed icon"
                    className="h-8 w-8"
                  />
                  <h1 className="pl-1.5 font-bold">
                    1 bed
                  </h1>
                </span>

                <span className="flex shrink-0 items-center">
                  <img
                    src="/bathroom1.svg"
                    alt="bathroom icon"
                    className="h-8 w-8"
                  />
                  <h1 className="pl-1.5 font-bold">
                    1 bathroom
                  </h1>
                </span>

                <span className="flex shrink-0 items-center">
                  <img
                    src="/services-icon.svg"
                    alt="serviced icon"
                    className="h-8 w-8"
                  />
                  <h1 className="pl-1.5 font-bold">
                    Serviced
                  </h1>
                </span>

              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FeatureProperties;
