"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Normal link style
  const navLinkStyles =
    "rounded-md font-bold px-3 py-2 text-[#1E5A4F] transition-all duration-200 hover:bg-[#FFF4D6] hover:text-[#C58D16]";

  // Active/current page style
  const activeNavLinkStyles =
    "rounded-md font-bold px-3 py-2 text-[#F4B942] underline decoration-2 underline-offset-4 transition-all duration-200";

  return (
    <header className="relative z-50 mx-5 flex items-center justify-between md:mx-12 lg:mx-auto lg:w-[92%] xl:w-[90%]">

      {/* Logo */}
      <Link href="/" className="flex items-center">
        <img
          src="/SH-LOGO.svg"
          alt="SpatialHunt logo"
          className="h-[65px] w-[53px] md:h-[90px] md:w-[73px]"
        />

        <h1 className="font-manrope">
          <span className="text-[#F4B942]">SPATIAL</span>
          <span className="text-[#1E5A4F]">HUNT</span>
        </h1>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:block">
        <ul className="flex items-center gap-8 lg:gap-6 xl:gap-8">

          {/* Home */}
          <li>
            <Link
              href="/"
              className={
                pathname === "/"
                  ? activeNavLinkStyles
                  : navLinkStyles
              }
            >
              Home
            </Link>
          </li>

          {/* Properties */}
          <li>
            <Link
              href="/properties"
              className={
                pathname === "/properties"
                  ? activeNavLinkStyles
                  : navLinkStyles
              }
            >
              Properties
            </Link>
          </li>

          {/* How it works */}
          <li>
            <Link
              href="/HowItWorks"
              className={
                pathname === "/HowItWorks"
                  ? activeNavLinkStyles
                  : navLinkStyles
              }
            >
              How it works
            </Link>
          </li>

          {/* About us */}
          <li>
            <Link
              href="/about"
              className={
                pathname === "/about"
                  ? activeNavLinkStyles
                  : navLinkStyles
              }
            >
              About us
            </Link>
          </li>

          {/* Resources */}
          <li>
            <Link
              href="/resources"
              className={
                pathname === "/resources"
                  ? activeNavLinkStyles
                  : navLinkStyles
              }
            >
              Resources
            </Link>
          </li>

          {/* Login */}
          <li>
            <Link
              href="/login"
              className={
                pathname === "/login"
                  ? activeNavLinkStyles
                  : navLinkStyles
              }
            >
              Login
            </Link>
          </li>

          {/* List Your Property */}
          <li>
            <Link
              href="/listproperty"
              className={
                pathname === "/listproperty"
                  ? "rounded-md bg-[#F4B940] px-4 py-2 text-[#F4B940] underline decoration-2 underline-offset-4 transition-all duration-200"
                  : "rounded-md bg-[#F4B940] px-4 py-2 text-[#1E5A4F] transition-all duration-200 hover:bg-[#1E5A4F] hover:text-white"
              }
            >
              List Your Property
            </Link>
          </li>

        </ul>
      </nav>

      {/* Mobile Menu Button */}
      <button
        type="button"
        onClick={() => setMenuOpen(!menuOpen)}
        className="relative z-[60] text-[#1E5A4F] transition-colors duration-200 hover:text-[#F4B942] md:hidden"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
      >
        {menuOpen ? (
          <span className="text-3xl">✕</span>
        ) : (
          <span className="text-3xl">☰</span>
        )}
      </button>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav className="absolute left-0 top-full z-50 w-full bg-white px-6 py-8 shadow-lg md:hidden">
          <ul className="flex flex-col gap-3">

            {/* Home */}
            <li>
              <Link
                href="/"
                onClick={closeMenu}
                className={
                  pathname === "/"
                    ? "block rounded-md px-4 py-3 font-bold text-[#F4B942] underline decoration-2 underline-offset-4"
                    : "block rounded-md px-4 py-3 font-bold text-[#1E5A4F] transition-all duration-200 hover:bg-[#FFF4D6] hover:text-[#C58D16]"
                }
              >
                Home
              </Link>
            </li>

            {/* Properties */}
            <li>
              <Link
                href="/properties"
                onClick={closeMenu}
                className={
                  pathname === "/properties"
                    ? "block rounded-md px-4 py-3 font-bold text-[#F4B942] underline decoration-2 underline-offset-4"
                    : "block rounded-md px-4 py-3 font-bold text-[#1E5A4F] transition-all duration-200 hover:bg-[#FFF4D6] hover:text-[#C58D16]"
                }
              >
                Properties
              </Link>
            </li>

            {/* How it works */}
            <li>
              <Link
                href="/#howitworks"
                onClick={closeMenu}
                className={
                  pathname === "/HowItWorks"
                    ? "block rounded-md px-4 py-3 font-bold text-[#F4B942] underline decoration-2 underline-offset-4"
                    : "block rounded-md px-4 py-3 font-bold text-[#1E5A4F] transition-all duration-200 hover:bg-[#FFF4D6] hover:text-[#C58D16]"
                }
              >
                How it works
              </Link>
            </li>

            {/* About us */}
            <li>
              <Link
                href="/about"
                onClick={closeMenu}
                className={
                  pathname === "/about"
                    ? "block rounded-md px-4 py-3 font-bold text-[#F4B942] underline decoration-2 underline-offset-4"
                    : "block rounded-md px-4 py-3 font-bold text-[#1E5A4F] transition-all duration-200 hover:bg-[#FFF4D6] hover:text-[#C58D16]"
                }
              >
                About us
              </Link>
            </li>

            {/* Resources */}
            <li>
              <Link
                href="/resources"
                onClick={closeMenu}
                className={
                  pathname === "/resources"
                    ? "block rounded-md px-4 py-3 font-bold text-[#F4B942] underline decoration-2 underline-offset-4"
                    : "block rounded-md px-4 py-3 font-bold text-[#1E5A4F] transition-all duration-200 hover:bg-[#FFF4D6] hover:text-[#C58D16]"
                }
              >
                Resources
              </Link>
            </li>

            {/* Login */}
            <li>
              <Link
                href="/login"
                onClick={closeMenu}
                className={
                  pathname === "/login"
                    ? "block rounded-md px-4 py-3 font-bold text-[#F4B942] underline decoration-2 underline-offset-4"
                    : "block rounded-md px-4 py-3 font-bold text-[#1E5A4F] transition-all duration-200 hover:bg-[#FFF4D6] hover:text-[#C58D16]"
                }
              >
                Login
              </Link>
            </li>

            {/* List Your Property */}
            <li className="pt-2">
              <Link
                href="/listproperty"
                onClick={closeMenu}
                className="block rounded-md bg-[#F4B940] px-4 py-3 text-center text-[#1E5A4F] transition-all duration-200 hover:bg-[#1E5A4F] hover:text-white"
              >
                List Your Property
              </Link>
            </li>

          </ul>
        </nav>
      )}

    </header>
  );
}