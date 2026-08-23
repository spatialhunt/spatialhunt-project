// import React from 'react'

// const HowItWorks = () => {
//   return (
//     <section id="howitworks" className="bg-[#1E5A4F] pb-3">
//         <div className="ml-10 pt-4">
//             {/* Title */}
//         <h1 className="font-medium text-2xl text-[#ffffff]">HOW IT WORKS</h1>
//         <h1 className="font-medium text-2xl text-[#F4B942]">Find or list your property in 3 simple steps</h1>
//         </div>
//         {/* flex items container */}
//         <div className="flex mx-3">
//     {/* first flex item */}
//             <div className="flex flex-col w-1/5 pt-8">
//                 <img src="./searchicon.svg" alt="searchicon" className="h-9 w-9 ml-25" />
//                 <h1 className="text-[#F4B942] text-center pt-1">Search List</h1>
//                 <p className="text-[#ffffff] text-center">Search verified properties <br /> or list your property <br /> in minutes.</p>
//             </div>
//             {/* 2nd flex item */}
//             <div className="flex flex-col w-1/5 pt-8">
//                 <img src="./messageicon.svg" alt="messageicon" className="h-9 w-9 ml-25" />
//                 <h1 className="text-[#F4B942] text-center pt-1">Connect</h1>
//                 <p className="text-[#ffffff] text-center">Chat directly with landlords <br /> or tenants. No middlemen, <br /> no stress.</p>
//             </div>
//             {/* 3rd flex item */}
//              <div className="flex flex-col w-1/5 pt-8">
//                 <img src="./dealicon.svg" alt="closethedealicon" className="h-9 w-9 ml-25" />
//                 <h1 className="text-[#F4B942] text-center pt-1">Close the deal</h1>
//                 <p className="text-[#ffffff] text-center">Schedule inspection, <br /> make payment, move in <br />or get your tenant.</p>
//             </div>
//             {/*  4th flex item    */}
//             {/* why spatialhunt section */}
//             <div className="flex flex-col w-1/5">
//                 <h1 className="font-medium text-2xl text-[#F4B942] mb-3">Why SpatialHunt?</h1>
//                 {/* list 1 */}
//                 <div className="flex mt-3">
//                     <img src="./goodicon.svg" alt="good-icon" className="h-5 w-5" />
//                     <h3 className="text-white pl-2">100% Verified Landlords</h3>
//                 </div>
//                  {/* list 2 */}
//                 <div className="flex mt-3">
//                     <img src="./goodicon.svg" alt="good-icon" className="h-5 w-5" />
//                     <h3 className="text-white pl-2">Direct Communication</h3>
//                 </div>
//                  {/* list 3 */}
//                 <div className="flex mt-3">
//                     <img src="./goodicon.svg" alt="good-icon" className="h-5 w-5" />
//                     <h3 className="text-white pl-2">Transparent & Secure</h3>
//                 </div>
//                  {/* list 4 */}
//                 <div className="flex mt-3">
//                     <img src="./goodicon.svg" alt="good-icon" className="h-5 w-5" />
//                     <h3 className="text-white pl-2">Built for Sustanability</h3>
//                 </div>
//             </div>
//             {/* 5th flex item */}
//             {/* house */}
//             <div className="flex w-1/5">
//                 <img src="./house.svg" alt="house-illustration"/>
//             </div>
//         </div>
       
//     </section>
//   )
// }

// export default HowItWorks
import React from 'react'

const HowItWorks = () => {
  return (
    <section
      id="howitworks"
      className="relative overflow-hidden bg-[#1E5A4F] pb-8 md:pb-3"
    >

      {/* Mobile house background */}
      <div className="absolute inset-0 flex items-center justify-center md:hidden pointer-events-none">
        <img
          src="./house.svg"
          alt=""
          className="w-[120%] max-w-none opacity-[0.10] blur-[2px]"
        />
      </div>

      {/* Title */}
      <div className="relative z-10 ml-5 sm:ml-10 pt-6 md:pt-4 text-center md:text-left">
        <h1 className="font-medium text-2xl text-[#ffffff]">
          HOW IT WORKS
        </h1>

        <h1 className="font-medium text-xl sm:text-2xl text-[#F4B942]">
          Find or list your property in 3 simple steps
        </h1>
      </div>

      {/* Flex items container */}
      <div className="relative z-10 flex flex-col md:flex-row mx-5 sm:mx-3">

        {/* First flex item */}
        <div className="flex flex-col w-full md:w-1/5 pt-10 md:pt-8 items-center md:items-stretch">
          <img
            src="./searchicon.svg"
            alt="searchicon"
            className="h-9 w-9 md:ml-25"
          />

          <h1 className="text-[#F4B942] text-center pt-2">
            Search List
          </h1>

          <p className="text-[#ffffff] text-center">
            Search verified properties <br className="hidden md:block" />
            or list your property <br className="hidden md:block" />
            in minutes.
          </p>
        </div>

        {/* 2nd flex item */}
        <div className="flex flex-col w-full md:w-1/5 pt-10 md:pt-8 items-center md:items-stretch">
          <img
            src="./messageicon.svg"
            alt="messageicon"
            className="h-9 w-9 md:ml-25"
          />

          <h1 className="text-[#F4B942] text-center pt-2">
            Connect
          </h1>

          <p className="text-[#ffffff] text-center">
            Chat directly with landlords <br className="hidden md:block" />
            or tenants. No middlemen, <br className="hidden md:block" />
            no stress.
          </p>
        </div>

        {/* 3rd flex item */}
        <div className="flex flex-col w-full md:w-1/5 pt-10 md:pt-8 items-center md:items-stretch">
          <img
            src="./dealicon.svg"
            alt="closethedealicon"
            className="h-9 w-9 md:ml-25"
          />

          <h1 className="text-[#F4B942] text-center pt-2">
            Close the deal
          </h1>

          <p className="text-[#ffffff] text-center">
            Schedule inspection, <br className="hidden md:block" />
            make payment, move in <br className="hidden md:block" />
            or get your tenant.
          </p>
        </div>

        {/* 4th flex item */}
        {/* Why SpatialHunt section */}
        <div className="flex flex-col w-full md:w-1/5 pt-12 md:pt-0 items-center md:items-stretch">

          <h1 className="font-medium text-2xl text-[#F4B942] mb-3 text-center md:text-left">
            Why SpatialHunt?
          </h1>

          {/* list 1 */}
          <div className="flex mt-3">
            <img
              src="./goodicon.svg"
              alt="good-icon"
              className="h-5 w-5 shrink-0"
            />
            <h3 className="text-white pl-2">
              100% Verified Landlords
            </h3>
          </div>

          {/* list 2 */}
          <div className="flex mt-3">
            <img
              src="./goodicon.svg"
              alt="good-icon"
              className="h-5 w-5 shrink-0"
            />
            <h3 className="text-white pl-2">
              Direct Communication
            </h3>
          </div>

          {/* list 3 */}
          <div className="flex mt-3">
            <img
              src="./goodicon.svg"
              alt="good-icon"
              className="h-5 w-5 shrink-0"
            />
            <h3 className="text-white pl-2">
              Transparent & Secure
            </h3>
          </div>

          {/* list 4 */}
          <div className="flex mt-3">
            <img
              src="./goodicon.svg"
              alt="good-icon"
              className="h-5 w-5 shrink-0"
            />
            <h3 className="text-white pl-2">
              Built for Sustainability
            </h3>
          </div>
        </div>

        {/* 5th flex item - Desktop house */}
        <div className="hidden md:flex w-1/5 justify-start pt-0">
          <img
            src="./house.svg"
            alt="house-illustration"
          />
        </div>

      </div>

    </section>
  )
}

export default HowItWorks