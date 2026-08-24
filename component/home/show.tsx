import React from 'react'

const Showsection = () => {
  return (
    <section className="mt-6">

      {/* Mobile version */}
      <div className="flex flex-col items-center gap-5 px-4 md:hidden">

        <div className="flex items-center justify-center gap-6">
          <div className="flex items-center">
            <img
              src="./Vector (2).svg"
              alt="logo"
              className="w-7 h-7"
            />
            <h1 className="text-xs ml-2">100% verified</h1>
          </div>

          <div className="flex items-center">
            <img
              src="./key.svg"
              alt="key-logo"
              className="w-7 h-7"
            />
            <h1 className="text-xs ml-2">Safe & Secure</h1>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="flex items-center">
            <img
              src="./pic1.svg"
              alt="person1"
              className="w-8 h-8 rounded-full object-cover border-2 border-white"
            />

            <img
              src="./pic2.svg"
              alt="person2"
              className="-ml-2 w-8 h-8 rounded-full object-cover border-2 border-white"
            />

            <img
              src="./pic3.svg"
              alt="person3"
              className="-ml-2 w-8 h-8 rounded-full object-cover border-2 border-white"
            />
          </div>

          <h1 className="ml-4 text-xs">
            Join 2,000+ happy renters <br />
            and landlords on SpatialHunt
          </h1>
        </div>

      </div>


      {/* Medium and large screen */}
      <div className="hidden md:flex mt-6 mx-20 items-center">

        {/* Verified */}
        <div className="flex items-center">
          <img
            src="./Vector (2).svg"
            alt="logo"
            className="w-9 h-9"
          />
          <h1 className="ml-2">100% verified</h1>
        </div>

        {/* Direct Communication */}
        <div className="flex items-center ml-15 lg:ml-12">
          <img
            src="./communication.svg"
            alt="communicationlogo"
            className="w-9 h-9"
          />
          <h1 className="ml-4">Direct Communication</h1>
        </div>

        {/* Safe & Secure */}
        <div className="flex items-center ml-15 lg:ml-12">
          <img
            src="./key.svg"
            alt="key-logo"
            className="w-9 h-9"
          />
          <h1 className="ml-4">Safe & Secure</h1>
        </div>

        {/* People */}
        <div className="flex items-center ml-25 lg:ml-16">
          <div className="flex items-center">

            <img
              src="./pic1.svg"
              alt="person1"
              className="w-9 h-9 rounded-full object-cover border-2 border-white"
            />

            <img
              src="./pic2.svg"
              alt="person2"
              className="-ml-3 w-9 h-9 rounded-full object-cover border-2 border-white"
            />

            <img
              src="./pic3.svg"
              alt="person3"
              className="-ml-3 w-9 h-9 rounded-full object-cover border-2 border-white"
            />

          </div>

          <h1 className="ml-10">
            Join 2,000+ happy renters <br />
            and landlords on SpatialHunt
          </h1>
        </div>

      </div>

    </section>
  )
}

export default Showsection