import Image from "next/image";

function Footer() {
  return (
    <footer className="bg-[#1E5A4FB2] px-8 py-5 text-white">
      {/* Main Footer Content */}
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-4">
        {/* Brand */}
        <div className="w-full md:w-[243px] md:min-w-0">
          <Image
            src="/SH.svg"
            alt="SpatialHunt"
            width={243}
            height={78}
            className="h-auto w-full lg:w-[243px]"
          />

          <p className="text-base font-medium leading-6">
            Verified, Direct-to-Landlord, Property Marketplace. Built for a
            safer & smarter way to rent properties in Nigeria.
          </p>
        </div>

        {/* Quick Links */}
        <div className="w-full md:w-[98px] md:min-w-0">
          <h3 className="text-base font-bold leading-6">
            Quick Links
          </h3>

          <div className="mt-1 flex w-[97px] flex-col text-base font-medium leading-6">
            <a href="#">Properties</a>
            <a href="#">How It Works</a>
            <a href="#">About Us</a>
            <a href="#">Resources</a>
            <a href="#">Contact Us</a>
          </div>
        </div>

        {/* For Landlords */}
        <div className="w-full md:w-[98px] md:min-w-0">
          <h3 className="text-base font-bold leading-6">
            For Landlords
          </h3>

          <div className="flex flex-col text-base font-medium leading-6">
            <a href="#">List Your Property</a>
            <a href="#">Landlord Benefits</a>
            <a href="#">Pricing</a>
            <a href="#">Success Stories</a>
          </div>
        </div>

        {/* Support */}
        <div className="w-full md:w-[124px] md:min-w-0">
          <h3 className="text-base font-bold leading-6">
            Support
          </h3>

          <div className="flex flex-col text-base font-medium leading-6">
            <a href="#">Help Center</a>
            <a href="#">Safety & Trust</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>

        {/* Contact Us */}
        <div className="w-full md:w-[208px] md:min-w-0">
          <h3 className="text-base font-bold leading-6">
            Contact Us
          </h3>

          <div className="flex flex-col gap-1 text-base font-medium leading-6">
            <div className="flex items-center gap-1">
              <Image
                src="/icon phone.svg"
                alt=""
                width={20}
                height={20}
              />
              <p>+234 XXX XXX XXXX</p>
            </div>

            <div className="flex items-center gap-1">
              <Image
                src="/mail.svg"
                alt=""
                width={20}
                height={20}
              />
              <p>hello@spatialhunt.com</p>
            </div>

            <div className="flex items-center gap-1">
              <Image
                src="/icon location.svg"
                alt=""
                width={20}
                height={20}
              />
              <p>Lagos, Nigeria</p>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="w-full md:w-[305px] md:min-w-0">
          <h3 className="text-base font-bold leading-6">
            Subscribe to our newsletter
          </h3>

          <p className="mt-1 text-base font-medium leading-6">
            Get the latest property update and tips straight to your inbox.
          </p>

          <form className="mt-3 flex h-[46px] w-full items-center gap-[7px]">
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="h-[42px] min-w-0 flex-1 rounded-[10px] border border-white bg-transparent px-[19px] py-[9px] text-base font-medium leading-6 text-white outline-none placeholder:text-white/70"
            />

            <button
              type="submit"
              className="h-[44px] w-[105px] shrink-0 rounded-[10px] border border-[#F4B942] bg-[#F4B942] px-[19px] py-[9px] text-base font-bold leading-6 text-[#1E5A4F]"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Download Our App */}
      <div className="mt-6 flex flex-col items-center gap-3 md:flex-row md:justify-center">
        <h3 className="text-base font-bold leading-6">
          Download Our App
        </h3>

        <a
          href="#"
          className="flex h-[42px] items-center gap-2 rounded-[10px] border border-white px-4"
        >
          <Image
            src="/icon googleplay.svg"
            alt="Google Play"
            width={20}
            height={20}
            className="h-[20px] w-[20px]"
          />

          <span className="text-base font-medium leading-6">
            Google Play
          </span>
        </a>

        <a
          href="#"
          className="flex h-[42px] items-center gap-2 rounded-[10px] border border-white px-4"
        >
          <Image
            src="/icon apple.svg"
            alt="App Store"
            width={20}
            height={20}
            className="h-[20px] w-[20px]"
          />

          <span className="text-base font-medium leading-6">
            App Store
          </span>
        </a>
      </div>

      {/* Social Media */}
      <div className="mt-6 flex justify-start gap-2">
        <Image
          src="/icon facebook.svg"
          alt="Facebook"
          width={24}
          height={24}
        />

        <a
          href="https://www.instagram.com/thespatialhunt?utm_source=qr&igsh=MWpiNGM3em1kbXoweg=="
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/instagram.svg"
            alt="Instagram"
            width={24}
            height={24}
          />
        </a>

        <Image
          src="/linkedin.svg"
          alt="LinkedIn"
          width={24}
          height={24}
        />

        <Image
          src="/icon youtube.svg"
          alt="YouTube"
          width={24}
          height={24}
        />
      </div>

      {/* Divider */}
      <hr className="mt-4 w-full border-t border-[#F4B942]" />

      {/* Bottom Footer */}
      <div className="flex flex-col items-center gap-3 px-4 pt-4 text-center md:flex-row md:justify-between md:text-left">
        <div className="flex items-center gap-2">
          <Image
            src="/icon copyright.svg"
            alt=""
            width={20}
            height={20}
          />

          <p className="text-base font-bold leading-6">
            2026 SpatialHunt. All rights reserved.
          </p>
        </div>

        <p className="text-right text-base font-bold leading-6">
          Made with passion for a better renting experience in Nigeria and
          Africa.
        </p>
      </div>
    </footer>
  );
}

export default Footer;