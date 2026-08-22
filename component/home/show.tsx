
import React from 'react'

const Showsection = () => {
  return (
    <main className="mt-6">

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


      {/* Medium and large screen - your original design */}
      <main className="hidden md:flex mt-6 mx-20">
        <img
          src="./Vector (2).svg"
          alt="logo"
          className="w-9 h-9 mt-2"
        />
        <h1 className="mt-3 ml-2">100% verified</h1>

        <img
          src="./communication.svg"
          alt="communicationlogo"
          className="w-9 h-9 ml-15 mt-2"
        />
        <h1 className="mt-3 ml-4">Direct Communication</h1>

        <img
          src="./key.svg"
          alt="key-logo"
          className="w-9 h-9 ml-15 mt-2"
        />
        <h1 className="mt-3 ml-4">Safe & Secure</h1>

        <div className="flex items-center ml-25">
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

        <h1 className="ml-10 mt-1">
          Join 2,000+ happy renters <br />
          and landlords on SpatialHunt
        </h1>
      </main>

    </main>
  )
}

export default Showsection