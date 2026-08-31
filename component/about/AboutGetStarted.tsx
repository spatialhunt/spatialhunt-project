import Image from "next/image";

export default function GetStarted() {
  return (
    <section className="w-full px-6 py-6">
      <div className="mx-auto flex max-w-[1128px] flex-col items-center gap-5 rounded-[10px] border border-[#D9E2DE] bg-[#1E5A4F] px-6 py-8 text-center md:flex-row md:items-center md:justify-between md:gap-0 md:px-8 md:py-2 md:text-left">
        
        {/* Property Image */}
        <div className="shrink-0">
          <Image
            src="/file_ee170 1.svg"
            alt="Property"
            width={225}
            height={60}
            className="h-auto w-[180px] object-cover md:h-[60px] md:w-[225px]"
          />
        </div>

        {/* Text */}
        <div className="flex-1 md:ml-5">
          <h2 className="m-0 max-w-[446px] text-[18px] font-bold leading-6 text-white mx-auto md:m-3 md:mx-0 md:pr-5 md:text-[22px] md:leading-5">
            Join thousands of Nigerians enjoying a
            better way to rent and manage properties
          </h2>
        </div>

        {/* Buttons */}
        <div className="flex w-full shrink-0 flex-col items-center gap-3 sm:w-auto sm:flex-row sm:gap-5">
          
          {/* Find a Home */}
          <button
            type="button"
            className="flex h-[34px] w-full items-center justify-center gap-2 rounded-[7px] border border-white px-4 text-[11px] font-medium text-white transition hover:bg-[#17483F] sm:w-auto"
          >
            <Image
              src="/ant-design_home-outlined.svg"
              alt=""
              width={17}
              height={17}
              className="h-[17px] w-[17px]"
            />

            <span>Find a Home</span>
          </button>

          {/* List Your Property */}
          <button
            type="button"
            className="flex h-[34px] w-full items-center justify-center gap-2 rounded-[7px] bg-[#F4B942] px-4 text-[11px] font-medium text-[#333333] transition hover:bg-[#E5AA32] sm:w-auto"
          >
            <Image
              src="/akar-icons_circle-plus.svg"
              alt=""
              width={17}
              height={17}
              className="h-[17px] w-[17px]"
            />

            <span>List Your Property</span>
          </button>

        </div>
      </div>
    </section>
  );
}