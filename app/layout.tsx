import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("http://thespatialhunt.com"),
  title: "SpatialHunt | Find Your Perfect Property",
  description: "Find verified properties and connect directly with landlords on SpatialHunt.",
  keywords: [
    "property rental Nigeria",
    "houses for rent in Nigeria",
    "apartments in Nigeria",
    "property marketplace Nigeria",
    "SpatialHunt",
  ],
  openGraph: {
    title: "SpatialHunt | Find Your Perfect Property",
    description:
      "Find verified properties and connect directly with landlords on SpatialHunt.",
    url: "http://thespatialhunt.com",
    siteName: "SpatialHunt",
    images: [
      {
        url: "/property-one.jpg",
        width: 1200,
        height: 630,
        alt: "SpatialHunt",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SpatialHunt | Find Your Perfect Property",
    description:
      "Find verified properties and connect directly with landlords on SpatialHunt.",
    images: ["/property-one.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.className} min-h-full`}>
        
        {children}
        
      </body>
    </html>
  );
}