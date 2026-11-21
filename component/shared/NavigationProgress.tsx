"use client";

/**
 * NavigationProgress
 * ------------------
 * Renders a slim progress bar at the very top of the viewport whenever
 * Next.js starts a client-side route transition.
 *
 * How it works:
 *  - Listens to Next.js router events via usePathname / useEffect.
 *  - On pathname change:  bar shoots to ~80 % width immediately (feels instant).
 *  - On render complete: bar jumps to 100 % then fades out.
 *
 * Zero dependencies beyond React and next/navigation.
 */

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function NavigationProgress() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevPathRef = useRef(pathname);

  // Track when pathname is about to change via link clicks
  useEffect(() => {
    // On every actual pathname change → complete the bar
    if (prevPathRef.current !== pathname) {
      prevPathRef.current = pathname;
      // Snap to 100% then hide
      setProgress(100);
      timerRef.current = setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 400);
    }
  }, [pathname]);

  // Intercept all <a> clicks to start the bar immediately
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto")) return;
      // Same-page link
      if (href === pathname) return;

      if (timerRef.current) clearTimeout(timerRef.current);
      setVisible(true);
      setProgress(0);

      // Quickly animate to 80% to signal loading
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setProgress(72);
        });
      });

      // If navigation takes longer, creep toward 90%
      timerRef.current = setTimeout(() => setProgress(88), 2000);
    }

    document.addEventListener("click", handleClick, { capture: true });
    return () => document.removeEventListener("click", handleClick, { capture: true });
  }, [pathname]);

  // Cleanup on unmount
  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  if (!visible && progress === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-[3px] w-full"
    >
      <div
        className="h-full bg-[#F4B942] shadow-[0_0_8px_rgba(244,185,66,0.7)] transition-all duration-300 ease-out"
        style={{
          width: `${progress}%`,
          opacity: visible ? 1 : 0,
          transition: progress === 100
            ? "width 200ms ease-out, opacity 300ms ease 200ms"
            : "width 500ms cubic-bezier(0.1,0.5,0.5,1)",
        }}
      />
    </div>
  );
}
