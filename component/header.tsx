/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => setMenuOpen(false);

  const navLink =
    "rounded-md font-bold px-3 py-2 text-[#1E5A4F] transition-all duration-200 hover:bg-[#FFF4D6] hover:text-[#C58D16]";

  const activeNavLink =
    "rounded-md font-bold px-3 py-2 text-[#F4B942] underline decoration-2 underline-offset-4 transition-all duration-200";

  const mobileLink =
    "block rounded-md px-4 py-3 font-bold text-[#1E5A4F] transition-all duration-200 hover:bg-[#FFF4D6] hover:text-[#C58D16]";

  const activeMobileLink =
    "block rounded-md px-4 py-3 font-bold text-[#F4B942] underline decoration-2 underline-offset-4";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#EEEEEE] bg-white shadow-sm">
      <div className="relative mx-auto flex h-17.5 w-full max-w-350 items-center justify-between px-5 md:px-10 lg:px-16 xl:px-20">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-1">
          <img
            src="/SH-LOGO.svg"
            alt="SpatialHunt logo"
            className="h-14 w-auto"
          />
          <span className="font-manrope text-base font-extrabold leading-none">
            <span className="text-[#F4B942]">SPATIAL</span>
            <span className="text-[#1E5A4F]">HUNT</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-6 lg:gap-5 xl:gap-6">

            <li>
              <Link href="/" className={pathname === "/" ? activeNavLink : navLink}>
                Home
              </Link>
            </li>

            <li>
              <Link href="/properties" className={pathname === "/properties" ? activeNavLink : navLink}>
                Properties
              </Link>
            </li>

            <li>
              <Link href="/how-it-works" className={pathname === "/how-it-works" ? activeNavLink : navLink}>
                How it works
              </Link>
            </li>

            <li>
              <Link href="/about" className={pathname === "/about" ? activeNavLink : navLink}>
                About us
              </Link>
            </li>

            <li>
              <Link href="/resources" className={pathname === "/resources" ? activeNavLink : navLink}>
                Resources
              </Link>
            </li>

            <li>
              <Link
                href="/login"
                className={pathname === "/login" ? activeNavLink : navLink}
              >
                Login
              </Link>
            </li>

            <li>
              <Link
                href="/signup"
                className={pathname.startsWith("/signup") ? activeNavLink : navLink}
              >
                Sign up
              </Link>
            </li>

            <li>
              <Link
                href="/list-property"
                className={
                  pathname === "/list-property"
                    ? "rounded-md bg-[#1E5A4F] px-4 py-2 text-sm font-bold text-white transition-all duration-200"
                    : "rounded-md bg-[#F4B940] px-4 py-2 text-sm font-bold text-[#1E5A4F] transition-all duration-200 hover:bg-[#1E5A4F] hover:text-white"
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
          className="relative z-60 text-[#1E5A4F] transition-colors duration-200 hover:text-[#F4B942] md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <span className="text-3xl leading-none">✕</span>
          ) : (
            <span className="text-3xl leading-none">☰</span>
          )}
        </button>

        {/* Mobile Navigation */}
        {menuOpen && (
          <nav className="absolute left-0 top-full z-50 w-full bg-white px-6 py-8 shadow-lg md:hidden">
            <ul className="flex flex-col gap-3">

              <li>
                <Link href="/" onClick={closeMenu} className={pathname === "/" ? activeMobileLink : mobileLink}>
                  Home
                </Link>
              </li>

              <li>
                <Link href="/properties" onClick={closeMenu} className={pathname === "/properties" ? activeMobileLink : mobileLink}>
                  Properties
                </Link>
              </li>

              <li>
                <Link href="/how-it-works" onClick={closeMenu} className={pathname === "/how-it-works" ? activeMobileLink : mobileLink}>
                  How it works
                </Link>
              </li>

              <li>
                <Link href="/about" onClick={closeMenu} className={pathname === "/about" ? activeMobileLink : mobileLink}>
                  About us
                </Link>
              </li>

              <li>
                <Link href="/resources" onClick={closeMenu} className={pathname === "/resources" ? activeMobileLink : mobileLink}>
                  Resources
                </Link>
              </li>

              <li>
                <Link href="/login" onClick={closeMenu} className={pathname === "/login" ? activeMobileLink : mobileLink}>
                  Login
                </Link>
              </li>

              <li>
                <Link href="/signup" onClick={closeMenu} className={pathname.startsWith("/signup") ? activeMobileLink : mobileLink}>
                  Sign up
                </Link>
              </li>

              <li className="pt-2">
                <Link
                  href="/list-property"
                  onClick={closeMenu}
                  className={
                    pathname === "/list-property"
                      ? "block rounded-md bg-[#1E5A4F] px-4 py-3 text-center font-bold text-white transition-all duration-200"
                      : "block rounded-md bg-[#F4B940] px-4 py-3 text-center font-bold text-[#1E5A4F] transition-all duration-200 hover:bg-[#1E5A4F] hover:text-white"
                  }
                >
                  List Your Property
                </Link>
              </li>

            </ul>
          </nav>
        )}

      </div>
    </header>
  );
}
