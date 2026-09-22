/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthSession } from "@/lib/use-auth-session";
import { clearSession } from "@/lib/auth-client";
import type { Role } from "@/lib/types";

const DASHBOARD_ROUTE: Record<Role, string> = {
  TENANT: "/dashboard/tenant",
  LANDLORD: "/landlord/dashboard",
  HUNTER: "/hunter/dashboard",
 ADMIN: "/admin/dashboard", // confirm this is the real admin landing route
};

const ROLE_LABEL: Record<Role, string> = {
  TENANT: "Tenant",
  LANDLORD: "Landlord",
  HUNTER: "Hunter",
  ADMIN: "Admin",
};

function getInitials(fullName: string | undefined, email: string): string {
  if (fullName && fullName.trim()) {
    const parts = fullName.trim().split(/\s+/);
    const first = parts[0]?.[0] ?? "";
    const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
    return (first + last).toUpperCase();
  }
  return email[0]?.toUpperCase() ?? "?";
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const session = useAuthSession();
  const profileRef = useRef<HTMLLIElement>(null);

  const closeMenu = () => setMenuOpen(false);

  // Close the profile dropdown on outside click
  useEffect(() => {
    if (!profileOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [profileOpen]);

  const handleLogout = () => {
    clearSession();
    setProfileOpen(false);
    setMenuOpen(false);
    router.push("/");
  };

  const navLink =
    "rounded-md font-bold px-3 py-2 text-[#1E5A4F] transition-all duration-200 hover:bg-[#FFF4D6] hover:text-[#C58D16]";

  const activeNavLink =
    "rounded-md font-bold px-3 py-2 text-[#F4B942] underline decoration-2 underline-offset-4 transition-all duration-200";

  const mobileLink =
    "block rounded-md px-4 py-3 font-bold text-[#1E5A4F] transition-all duration-200 hover:bg-[#FFF4D6] hover:text-[#C58D16]";

  const activeMobileLink =
    "block rounded-md px-4 py-3 font-bold text-[#F4B942] underline decoration-2 underline-offset-4";

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/properties", label: "Properties" },
    { href: "/how-it-works", label: "How it works" },
    { href: "/about", label: "About us" },
    { href: "/resources", label: "Resources" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#EEEEEE] bg-white shadow-sm">
      <div className="relative mx-auto flex h-17.5 w-full max-w-350 items-center justify-between px-5 md:px-10 lg:px-16 xl:px-20">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-1">
          <img src="/SH-LOGO.svg" alt="SpatialHunt logo" className="h-14 w-auto" />
          <span className="font-manrope text-base font-extrabold leading-none">
            <span className="text-[#F4B942]">SPATIAL</span>
            <span className="text-[#1E5A4F]">HUNT</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-6 lg:gap-5 xl:gap-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={pathname === item.href ? activeNavLink : navLink}>
                  {item.label}
                </Link>
              </li>
            ))}

            {session ? (
              <>
                {/* List Your Property stays visible for logged-in users too */}
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

                {/* Profile dropdown */}
                <li className="relative" ref={profileRef}>
                  <button
                    type="button"
                    onClick={() => setProfileOpen((v) => !v)}
                    className="flex items-center gap-2 rounded-full border border-[#EEEEEE] py-1 pl-1 pr-3 transition-colors duration-200 hover:bg-[#F1F7F5]"
                    aria-haspopup="true"
                    aria-expanded={profileOpen}
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1E5A4F] text-xs font-bold text-white">
                      {getInitials(session.fullName, session.email)}
                    </span>
                    <span className="max-w-30 truncate text-sm font-bold text-[#1E5A4F]">
                      {session.fullName ?? session.email}
                    </span>
                    <svg
                      className={`h-3 w-3 text-[#1E5A4F] transition-transform duration-200 ${profileOpen ? "rotate-180" : ""}`}
                      viewBox="0 0 12 8" fill="none"
                    >
                      <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-[#EEEEEE] bg-white py-2 shadow-lg">
                      <div className="border-b border-[#F5F5F5] px-4 py-3">
                        <p className="truncate text-sm font-bold text-[#2E2E2E]">
                          {session.fullName ?? "My Account"}
                        </p>
                        <p className="truncate text-xs text-[#999]">{session.email}</p>
                        <span className="mt-1.5 inline-block rounded-full bg-[#EAF3F0] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#1E5A4F]">
                          {ROLE_LABEL[session.role]}
                        </span>
                      </div>
                      <Link
                        href={DASHBOARD_ROUTE[session.role]}
                        onClick={() => setProfileOpen(false)}
                        className="block px-4 py-2.5 text-sm font-semibold text-[#1E5A4F] transition hover:bg-[#F1F7F5]"
                      >
                        Go to Dashboard
                      </Link>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="block w-full px-4 py-2.5 text-left text-sm font-semibold text-[#B42318] transition hover:bg-[#FBEAE9]"
                      >
                        Log out
                      </button>
                    </div>
                  )}
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/login" className={pathname === "/login" ? activeNavLink : navLink}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/signup" className={pathname.startsWith("/signup") ? activeNavLink : navLink}>
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
              </>
            )}
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
          {menuOpen ? <span className="text-3xl leading-none">✕</span> : <span className="text-3xl leading-none">☰</span>}
        </button>

        {/* Mobile Navigation */}
        {menuOpen && (
          <nav className="absolute left-0 top-full z-50 w-full bg-white px-6 py-8 shadow-lg md:hidden">
            <ul className="flex flex-col gap-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} onClick={closeMenu} className={pathname === item.href ? activeMobileLink : mobileLink}>
                    {item.label}
                  </Link>
                </li>
              ))}

              {session ? (
                <>
                  <li className="mt-2 flex items-center gap-3 rounded-md border border-[#EEEEEE] px-4 py-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1E5A4F] text-xs font-bold text-white">
                      {getInitials(session.fullName, session.email)}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-[#2E2E2E]">{session.fullName ?? session.email}</p>
                      <span className="text-[10px] font-bold uppercase tracking-wide text-[#1E5A4F]">
                        {ROLE_LABEL[session.role]}
                      </span>
                    </div>
                  </li>
                  <li>
                    <Link href={DASHBOARD_ROUTE[session.role]} onClick={closeMenu} className={mobileLink}>
                      Go to Dashboard
                    </Link>
                  </li>
                  <li>
                    <button type="button" onClick={handleLogout} className="block w-full rounded-md px-4 py-3 text-left font-bold text-[#B42318] transition hover:bg-[#FBEAE9]">
                      Log out
                    </button>
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
                </>
              ) : (
                <>
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
                </>
              )}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}