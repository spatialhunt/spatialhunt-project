import React from 'react'
import Link from 'next/link'

const LandLord = () => {
  return (
    <section className="mx-5 mt-0 flex flex-col gap-8 md:flex-row md:justify-between md:gap-12 lg:mx-10 lg:items-center lg:gap-8">

      {/* flex 1 */}
      <div className="flex w-full justify-center md:w-1/3 md:justify-start lg:w-[34%]">
        <img
          src="./landlordimg.svg"
          alt="landlord-img"
          className="h-auto w-full max-w-[400px] md:h-[304px] md:w-[457px] lg:w-[460px]"
        />
      </div>

      {/* flex 2 */}
      <div className="flex w-full flex-col text-center md:w-1/3 md:text-left lg:w-[32%]">
        <p className="pt-2 font-bold text-[#1E5A4F] md:pt-6">
          ARE YOU A LANDLORD?
        </p>

        <h1 className="pb-3 pt-3 text-xl font-bold text-[#2E2E2E] md:pt-4 md:text-2xl">
          List your Property and get quality tenants faster
        </h1>

        <p className="mt-3.5 text-[#2E2E2E] md:mt-0">
          Reach thousands of serious and genuine renters looking for their
          next home. List once, get noticed twice!
        </p>

        <div className="mt-5.5 flex justify-center md:justify-start">
          <Link href="/listproperty">
            <button className="inline-flex items-center gap-2 rounded-md bg-[#F4B942] px-4 py-2 text-[#1E5A4F] transition-all duration-200 hover:bg-[#1E5A4F] hover:text-white">
              List Your Property Now
              <span className="flex h-3 w-3 shrink-0">
                <img src="./arrow.svg" alt="arrow-icon" />
              </span>
            </button>
          </Link>
        </div>
      </div>

      {/* flex 3 */}
      <div className="flex w-full justify-center md:w-1/3 md:justify-start lg:w-[34%] lg:justify-end">
        <img
          src="./landlord2.svg"
          alt="landlord2-img"
          className="h-auto w-full max-w-[400px] md:h-[298px] md:w-[500px] lg:w-[480px]"
        />
      </div>

    </section>
  )
}

export default LandLord