import Image from "next/image";

export default function GetStarted() {
  return (
    <section className="w-full px-6 py-6">
      <div className="mx-auto flex max-w-[1128px] items-center justify-between rounded-[10px] border border-[#D9E2DE] bg-[#1E5A4F] px-8 py-2 md:flex-row md:justify-between">
        
        {/* Property Image */}
        <div className="shrink-0">
          <Image
            src="/file_ee170 1.svg"
            alt="Property"
            width={225}
            height={60}
            className="h-[60px] w-[225px] object-cover"
          />
        </div>

        {/* Text */}
        <div className="ml-5 flex-1">
          <h2 className="m-3 pr-5 max-w-[446px]text-[22px] font-bold leading-5 text-white">
            Join thousands of Nigerians enjoying a
            better way to rent and manage properties
          </h2>
        </div>

        {/* Buttons */}
        <div className="flex shrink-0 items-center gap-5">
          
          {/* Find a Home */}
          <button
            type="button"
            className="flex h-[34px] items-center gap-2 rounded-[7px] border border-white px-4 text-[11px] font-medium text-white transition hover:bg-[#17483F]"
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
            className="flex h-[34px] items-center gap-2 rounded-[7px] bg-[#F4B942] px-4 text-[11px] font-medium text-[#333333] transition hover:bg-[#E5AA32]"
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