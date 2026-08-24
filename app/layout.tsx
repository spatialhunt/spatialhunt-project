import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/component/header";
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
<<<<<<< HEAD
    <html lang="en">
      <body className={`${manrope.className} min-h-full`}>
        <Header />
        {children}
        <Footer />
=======
    <html
      lang="en"
      className={`${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
>>>>>>> 2247494f13197d909e2106b0135957be7557c7b1
      </body>
    </html>
  );
}