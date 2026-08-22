"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./header.module.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const navLinkStyles =
    "rounded-md px-3 py-2 text-[#1E5A4F] transition-all duration-200 hover:bg-[#FFF4D6] hover:text-[#C58D16]";

  return (
    <header className="relative z-50 mx-5 flex items-center justify-between md:mx-12">
      
      {/* Logo */}
      <Link href="/" className="flex items-center">
        <img
          src="/SH-LOGO.svg"
          alt="SpatialHunt logo"
          className={styles.logo}
        />

        <h1 className="font-manrope">
          <span className="text-[#F4B942]">SPACIAL</span>
          <span className="text-[#1E5A4F]">HUNT</span>
        </h1>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:block">
        <ul className="flex items-center gap-8">

          <li>
            <Link
              href="/"
              className="px-3 py-2 text-[#F4B942] transition-all duration-200 hover:bg-[#C58D16] hover:text-[#1E5A4F] underline"
            >
              Home
            </Link>
          </li>

          <li>
            <Link href="/properties" className={navLinkStyles}>
              Properties
            </Link>
          </li>

          <li>
            <a
              href="#howitworks"
              className={navLinkStyles}
            >
              How it works
            </a>
          </li>

          <li>
            <Link href="/about" className={navLinkStyles}>
              About us
            </Link>
          </li>

          <li>
            <Link href="/resources" className={navLinkStyles}>
              Resources
            </Link>
          </li>

          <li>
            <Link href="/login" className={navLinkStyles}>
              Login
            </Link>
          </li>

          <li>
            <Link
              href="/list-property"
              className="rounded-md bg-[#F4B942] px-4 py-2 text-[#1E5A4F] transition-all duration-200 hover:bg-[#1E5A4F] hover:text-white"
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

            <li>
              <Link
                href="/"
                onClick={closeMenu}
                className="block rounded-md bg-[#FFF4D6] px-4 py-3 text-[#C58D16]"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/properties"
                onClick={closeMenu}
                className="block rounded-md px-4 py-3 text-[#1E5A4F] transition-all duration-200 hover:bg-[#FFF4D6] hover:text-[#C58D16]"
              >
                Properties
              </Link>
            </li>

            <li>
              <a
                href="#howitworks"
                onClick={closeMenu}
                className="block rounded-md px-4 py-3 text-[#1E5A4F] transition-all duration-200 hover:bg-[#FFF4D6] hover:text-[#C58D16]"
              >
                How it works
              </a>
            </li>

            <li>
              <Link
                href="/about"
                onClick={closeMenu}
                className="block rounded-md px-4 py-3 text-[#1E5A4F] transition-all duration-200 hover:bg-[#FFF4D6] hover:text-[#C58D16]"
              >
                About us
              </Link>
            </li>

            <li>
              <Link
                href="/resources"
                onClick={closeMenu}
                className="block rounded-md px-4 py-3 text-[#1E5A4F] transition-all duration-200 hover:bg-[#FFF4D6] hover:text-[#C58D16]"
              >
                Resources
              </Link>
            </li>

            <li>
              <Link
                href="/login"
                onClick={closeMenu}
                className="block rounded-md px-4 py-3 text-[#1E5A4F] transition-all duration-200 hover:bg-[#FFF4D6] hover:text-[#C58D16]"
              >
                Login
              </Link>
            </li>

            <li className="pt-2">
              <Link
                href="/list-property"
                onClick={closeMenu}
                className="block rounded-md bg-[#F4B942] px-4 py-3 text-center text-[#1E5A4F] transition-all duration-200 hover:bg-[#1E5A4F] hover:text-white"
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