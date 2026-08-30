import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import Header from "@/component/header";
import Footer from "@/component/Footer";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SpatialHunt",
  description: "Find the perfect space with SpatialHunt",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.className} min-h-full`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}