import React from 'react'
import Image from "next/image";

function Footer() {
  return (
    <footer className="bg-[#1E5A4FB2] px-8 py-5 text-white">
        <div className="mx-auto max-w-7xl">
            {/* Main Footer Content */}
            <div>
            {/* Brand */}

            {/* Quick Links */}

            {/* For Landlords */}

            {/* Support */}

            {/* Contact Us */}

            {/* Newsletter */}
            </div>

            {/* App Download */}
            <div>
            {/* Google Play */}
            {/* App Store */}
            </div>

            {/* Social Media */}
            <div className="flex space-x-2 p-2">
                <img src="/icon facebook.svg" className="h-6 w-6" />
                <img src="/instagram.svg" className="h-6 w-6" />
                <img src="/linkedin.svg" className="h-6 w-6" />
                <img src="/icon youtube.svg" className="h-6 w-6" />
            </div>
            
            <hr className="w-full border-t p-1 border-[#F4B942]" />

            {/* Bottom Footer */}
            <div className="flex items-center justify-between px-8">
                <img
                src="/icon copyright.svg"
                className="h-10 w-auto p-l-2"
                />
                <p className="text-base font-bold leading-6 text-white">
                    2026 SpatialHunt. All rights reserved.
                </p>

                <p className="text-right text-base font-bold leading-6 text-white">
                    Made with passion for a better renting experience in Nigeria and Africa.
                </p>
            </div>

        </div>
    </footer>
  )
}

export default Footer