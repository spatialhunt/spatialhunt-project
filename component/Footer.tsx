"use client";

import Link from "next/link";
import Image from "next/image";

const quickLinks = [
  { label: "Properties",   href: "/properties" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About Us",     href: "/about" },
  { label: "Resources",    href: "/resources" },
  { label: "Contact Us",   href: "#contact" },
];

const forLandlords = [
  { label: "List Your Property",  href: "/list-property" },
  { label: "Landlord Benefits",   href: "#" },
  { label: "Pricing",             href: "#" },
  { label: "Success Stories",     href: "#" },
];

const support = [
  { label: "Help Center",    href: "#" },
  { label: "Safety & Trust", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Use",   href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1E5A4F] text-white">

      {/* ── Main content ── */}
      <div className="mx-auto w-full max-w-[1400px] px-5 py-12 md:px-10 lg:px-16 xl:px-20">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 xl:gap-12">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-1">
              <Image src="/SH-LOGO.svg" alt="SpatialHunt" width={46} height={56} unoptimized />
              <span className="font-manrope text-lg font-extrabold">
                <span className="text-[#F4B940]">SPATIAL</span>HUNT
              </span>
            </Link>
            <p className="mt-4 text-sm leading-7 text-white/70">
              Verified, Direct-to-Landlord Property Marketplace. Built for a
              safer &amp; smarter way to rent in Nigeria.
            </p>
            {/* Social icons */}
            <div className="mt-5 flex gap-3">
              {[
                { src: "/icon facebook.svg", href: "#",                                                            alt: "Facebook" },
                { src: "/instagram.svg",     href: "https://www.instagram.com/thespatialhunt",                    alt: "Instagram" },
                { src: "/tiktok.svg",        href: "https://www.tiktok.com/@spatialhunt",                        alt: "TikTok" },
                { src: "/x.svg",             href: "https://x.com/thespatialhunt",                               alt: "X" },
              ].map((s) => (
                <a
                  key={s.alt}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-[#F4B940]/30"
                >
                  <Image src={s.src} alt={s.alt} width={18} height={18} unoptimized />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-extrabold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-white/70 transition hover:text-[#F4B940]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Landlords */}
          <div>
            <h3 className="mb-4 text-sm font-extrabold uppercase tracking-wider text-white">
              For Landlords
            </h3>
            <ul className="flex flex-col gap-2.5">
              {forLandlords.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-white/70 transition hover:text-[#F4B940]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 text-sm font-extrabold uppercase tracking-wider text-white">
              Support
            </h3>
            <ul className="flex flex-col gap-2.5">
              {support.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-white/70 transition hover:text-[#F4B940]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="mb-4 text-sm font-extrabold uppercase tracking-wider text-white">
              Contact Us
            </h3>
            <ul className="flex flex-col gap-2.5">
              {[
                { icon: "/icon phone.svg",    text: "+234 XXX XXX XXXX" },
                { icon: "/mail.svg",          text: "hello@spatialhunt.com" },
                { icon: "/icon location.svg", text: "Lagos, Nigeria" },
              ].map((c) => (
                <li key={c.text} className="flex items-center gap-2.5 text-sm text-white/70">
                  <Image src={c.icon} alt="" width={16} height={16} unoptimized className="shrink-0 opacity-80" />
                  {c.text}
                </li>
              ))}
            </ul>

            {/* Newsletter */}
            <div className="mt-6">
              <h3 className="mb-2 text-sm font-extrabold uppercase tracking-wider text-white">
                Newsletter
              </h3>
              <p className="mb-3 text-xs text-white/60">
                Get the latest property updates straight to your inbox.
              </p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  required
                  placeholder="Your email"
                  className="h-10 min-w-0 flex-1 rounded-lg border border-white/30 bg-white/10 px-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#F4B940]"
                />
                <button
                  type="submit"
                  className="h-10 rounded-lg bg-[#F4B940] px-4 text-sm font-bold text-[#1E5A4F] transition hover:bg-[#e0a830]"
                >
                  Go
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* App download */}
        <div className="mt-10 flex flex-col items-center gap-3 border-t border-white/10 pt-8 sm:flex-row sm:justify-center">
          <span className="text-sm font-bold text-white">Download Our App:</span>
          {[
            { icon: "/icon googleplay.svg", label: "Google Play" },
            { icon: "/icon apple.svg",      label: "App Store" },
          ].map((a) => (
            <a
              key={a.label}
              href="#"
              className="flex h-10 items-center gap-2 rounded-lg border border-white/30 px-4 text-sm text-white transition hover:border-[#F4B940] hover:text-[#F4B940]"
            >
              <Image src={a.icon} alt={a.label} width={18} height={18} unoptimized />
              {a.label}
            </a>
          ))}
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-[#F4B942]/30">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center gap-2 px-5 py-4 text-center text-xs text-white/50 md:flex-row md:justify-between md:text-left md:px-10 lg:px-16 xl:px-20">
          <span>© 2026 SpatialHunt. All rights reserved.</span>
          <span>Made with passion for a better renting experience in Nigeria &amp; Africa.</span>
        </div>
      </div>
    </footer>
  );
}
