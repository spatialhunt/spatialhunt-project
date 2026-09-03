
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

const propertyData = {
  "two-bedroom-apartment": {
    title: "2 Bedroom Apartment",
    location: "Lekki Phase 1, Lagos",
    price: "₦2,500,000/year",
    beds: 2,
    bathrooms: 2,
    parking: 1,
    propertyType: "Apartment",
    furnishing: "Semi-Furnished",
    status: "Available",
    listedOn: "Aug 22, 2026",
    propertyId: "SH-LP1-A-1023",

    description:
      "Lovely 2 bedroom apartment in a secure estate with 24/7 electricity, security, clean water and well maintained environment.",

    about:
      "This modern 2 bedroom apartment offers comfort and convenience in one of Lagos most sought-after locations. Situated in a well secured estate with constant power supply, treated water supply, and 24/7 security.",

    response: "Response rate: 96%",
    responseTime: "Response time: within 30 mins",
  },
};

const galleryImages = [
  "/bmain.svg",
  "/thumbnail1.svg",
  "/thumbnail2.svg",
  "/thumbnail3.svg",
  "/thumbnail4.svg",
  "/thumbnail5.svg",
];

const amenities = [
  {
    name: "Fitted Kitchen",
    icon: "/filteredkitchen.svg",
  },
  {
    name: "Swimming Pool",
    icon: "/swimming.svg",
  },
  {
    name: "Prepared Meter",
    icon: "/preparedmeter.svg",
  },
  {
    name: "Balcony",
    icon: "/balcony.svg",
  },
  {
    name: "Air Conditioning",
    icon: "/aircondition.svg",
  },
  {
    name: "Tiled Floor",
    icon: "/tiledfloor.svg",
  },
  {
    name: "POP Ceiling",
    icon: "/ceiling.svg",
  },
  {
    name: "Ample Parking Space",
    icon: "/parking.svg",
  },
];

export default function PropertyDetailsPage() {
  const params = useParams();

  const id = Array.isArray(params?.id)
    ? params.id[0]
    : params?.id || "two-bedroom-apartment";

  const property =
    propertyData[id as keyof typeof propertyData] ||
    propertyData["two-bedroom-apartment"];

  const [activeImage, setActiveImage] = useState(0);
  const [saved, setSaved] = useState(false);
  const [requested, setRequested] = useState(false);
  const [showMoreAbout, setShowMoreAbout] = useState(false);

  const nextImage = () => {
    setActiveImage((current) =>
      current === galleryImages.length - 1 ? 0 : current + 1
    );
  };

  const previousImage = () => {
    setActiveImage((current) =>
      current === 0 ? galleryImages.length - 1 : current - 1
    );
  };

  const handleShare = async () => {
    const shareData = {
      title: property.title,
      text: `Check out this property on SpatialHunt: ${property.title}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Property link copied!");
      }
    } catch {
      // User cancelled sharing.
    }
  };

  const handleRequest = () => {
    setRequested((current) => !current);
  };

  return (
    <main className="w-full bg-white text-[#2E2E2E]">
      {/* ===================================================== */}
      {/* PAGE CONTAINER */}
      {/* ===================================================== */}

      <div
        className="
          mx-auto
          w-full
          max-w-[1400px]
          px-4
          pb-10
          pt-6
          sm:px-5
          sm:pt-8
          md:px-7
          md:pt-10
          lg:px-10
          lg:pt-8
          xl:px-12
        "
      >
        {/* ===================================================== */}
        {/* TOP NAVIGATION / BREADCRUMB + SHARE + SAVE */}
        {/* ===================================================== */}

        <div
          className="
            flex
            w-full
            flex-col
            gap-4
            border-b
            border-[#EAEAEA]
            py-5
            sm:py-6
            md:flex-row
            md:items-center
            md:justify-between
            lg:py-5
          "
        >
          {/* LEFT: BREADCRUMB */}

          <div
            className="
              flex
              min-w-0
              flex-wrap
              items-center
              gap-2
              text-[11px]
              sm:text-xs
              md:text-sm
              lg:text-[15px]
              xl:text-sm
            "
          >
            <Link
              href="/"
              className="
                whitespace-nowrap
                font-medium
                text-[#2E2E2E]
                transition
                hover:text-[#1E5A4F]
              "
            >
              Home
            </Link>

            <img
              src="/arrow1.svg"
              alt=""
              className="h-3 w-3 shrink-0 object-contain sm:h-3.5 sm:w-3.5"
            />

            <Link
              href="/properties"
              className="
                whitespace-nowrap
                font-medium
                text-[#2E2E2E]
                transition
                hover:text-[#1E5A4F]
              "
            >
              Properties
            </Link>

            <img
              src="/arrow1.svg"
              alt=""
              className="h-3 w-3 shrink-0 object-contain sm:h-3.5 sm:w-3.5"
            />

            <span className="truncate font-medium text-[#2E2E2E]">
              2 Bedroom Apartment
            </span>
          </div>

          {/* RIGHT: SHARE + SAVE */}

          <div className="flex items-center gap-5 sm:gap-6 md:gap-5 lg:gap-6">
            {/* SHARE */}

            <button
              type="button"
              onClick={handleShare}
              className="
                flex
                items-center
                gap-2
                text-[11px]
                font-medium
                text-[#2E2E2E]
                transition
                hover:text-[#1E5A4F]
                sm:text-xs
                md:text-[13px]
                lg:text-[13px]
              "
            >
              <img
                src="/share.svg"
                alt="Share"
                className="h-4 w-4 shrink-0 object-contain lg:h-[17px] lg:w-[17px]"
              />

              <span>Share</span>
            </button>

            {/* SAVE */}

            <button
              type="button"
              onClick={() => setSaved((current) => !current)}
              className={`
                flex
                items-center
                gap-2
                text-[11px]
                font-medium
                transition
                sm:text-xs
                md:text-[13px]
                lg:text-[13px]
                ${
                  saved
                    ? "text-[#1E5A4F]"
                    : "text-[#2E2E2E] hover:text-[#1E5A4F]"
                }
              `}
            >
              <img
                src="/save.svg"
                alt="Save Property"
                className="h-4 w-4 shrink-0 object-contain"
              />

              <span>{saved ? "Saved Property" : "Save Property"}</span>
            </button>
          </div>
        </div>

        {/* ===================================================== */}
        {/* TOP PROPERTY AREA */}
        {/* ===================================================== */}

        <div
          className="
            grid
            w-full
            grid-cols-1
            gap-6
            lg:grid-cols-[minmax(0,1fr)_300px]
            lg:gap-6
            xl:grid-cols-[minmax(0,1fr)_320px]
            xl:gap-8
          "
        >
          {/* ================================================= */}
          {/* LEFT SIDE */}
          {/* ================================================= */}

          <div className="min-w-0">
            {/* IMAGE + PROPERTY INFORMATION */}

            <div
              className="
                grid
                w-full
                grid-cols-1
                gap-5
                md:grid-cols-[minmax(0,1.25fr)_minmax(250px,0.75fr)]
                lg:grid-cols-[minmax(0,1.18fr)_minmax(235px,0.82fr)]
                lg:gap-5
              "
            >
              {/* IMAGE GALLERY */}

              <div className="min-w-0">
                {/* MAIN IMAGE */}

                <div
                  className="
                    relative
                    h-[250px]
                    w-full
                    overflow-hidden
                    rounded-[8px]
                    border
                    border-[#D9D9D9]
                    bg-[#F7F7F7]
                    sm:h-[300px]
                    md:h-[330px]
                    lg:h-[345px]
                    xl:h-[380px]
                  "
                >
                  <img
                    src={galleryImages[activeImage]}
                    alt={property.title}
                    className="h-full w-full object-cover"
                  />

                  {/* PREVIOUS */}

                  <button
                    type="button"
                    onClick={previousImage}
                    aria-label="Previous image"
                    className="
                      absolute
                      left-3
                      top-1/2
                      flex
                      h-8
                      w-8
                      -translate-y-1/2
                      items-center
                      justify-center
                      rounded-full
                      bg-white/95
                      text-lg
                      shadow-sm
                      transition
                      hover:bg-white
                      sm:h-9
                      sm:w-9
                    "
                  >
                    ‹
                  </button>

                  {/* NEXT */}

                  <button
                    type="button"
                    onClick={nextImage}
                    aria-label="Next image"
                    className="
                      absolute
                      right-3
                      top-1/2
                      flex
                      h-8
                      w-8
                      -translate-y-1/2
                      items-center
                      justify-center
                      rounded-full
                      bg-white/95
                      text-lg
                      shadow-sm
                      transition
                      hover:bg-white
                      sm:h-9
                      sm:w-9
                    "
                  >
                    ›
                  </button>
                </div>

                {/* THUMBNAILS */}

                <div
                  className="
                    mt-3
                    flex
                    w-full
                    gap-2
                    overflow-x-auto
                    pb-1
                    sm:gap-3
                  "
                >
                  {galleryImages.map((image, index) => (
                    <button
                      key={image}
                      type="button"
                      onClick={() => setActiveImage(index)}
                      aria-label={`View property image ${index + 1}`}
                      className={`
                        relative
                        h-[52px]
                        w-[62px]
                        shrink-0
                        overflow-hidden
                        rounded-[5px]
                        border
                        bg-[#F7F7F7]
                        transition
                        sm:h-[60px]
                        sm:w-[72px]
                        md:h-[62px]
                        md:w-[76px]
                        lg:h-[58px]
                        lg:w-[72px]
                        ${
                          activeImage === index
                            ? "border-2 border-[#1E5A4F]"
                            : "border-[#D9D9D9]"
                        }
                      `}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* PROPERTY INFORMATION */}

              <div className="min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h1
                      className="
                        text-base
                        font-bold
                        leading-tight
                        text-[#2E2E2E]
                        sm:text-lg
                        md:text-xl
                        lg:text-[17px]
                        xl:text-lg
                      "
                    >
                      {property.title}
                    </h1>

                    <div className="mt-2 flex items-center gap-1.5">
                      <img
                        src="/location.svg"
                        alt=""
                        className="h-4 w-4 shrink-0"
                      />

                      <span
                        className="
                          text-[11px]
                          text-[#666666]
                          sm:text-[12px]
                          lg:text-[12px]
                        "
                      >
                        {property.location}
                      </span>
                    </div>
                  </div>

                  {/* SAVE */}

                  <button
                    type="button"
                    onClick={() => setSaved((current) => !current)}
                    className="
                      flex
                      shrink-0
                      items-center
                      gap-1.5
                      text-[10px]
                      text-[#555555]
                      transition
                      hover:text-[#1E5A4F]
                      sm:text-xs
                    "
                  >
                    <img
                      src="/save.svg"
                      alt=""
                      className="h-4 w-4"
                    />

                    <span className="hidden sm:inline">
                      {saved ? "Saved" : "Save"}
                    </span>
                  </button>
                </div>

                {/* PRICE */}

                <div className="mt-4 flex items-center justify-between gap-3">
                  <p
                    className="
                      text-base
                      font-bold
                      text-[#1E5A4F]
                      sm:text-lg
                      md:text-xl
                      lg:text-base
                      xl:text-lg
                    "
                  >
                    {property.price}
                  </p>

                  <span
                    className="
                      inline-flex
                      items-center
                      gap-1
                      rounded-[4px]
                      bg-[#117E2526]
                      px-2
                      py-1
                      text-[8px]
                      font-medium
                      text-[#117E25]
                      sm:text-[9px]
                    "
                  >
                    <img
                      src="/verify.svg"
                      alt=""
                      className="h-3 w-3"
                    />

                    Verified property
                  </span>
                </div>

                {/* FEATURES */}

                <div
                  className="
                    mt-4
                    flex
                    flex-wrap
                    items-center
                    gap-x-4
                    gap-y-2
                    border-b
                    border-[#D9D9D9]
                    pb-4
                  "
                >
                  <div className="flex items-center gap-1.5">
                    <img
                      src="/beds.svg"
                      alt="bed icon"
                      className="h-4.5 w-4.5"
                    />

                    <span className="text-[11px] text-[#555555] sm:text-xs">
                      {property.beds} Beds
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <img
                      src="/bathroom.svg"
                      alt=""
                      className="h-4 w-4"
                    />

                    <span className="text-[10px] text-[#555555] sm:text-xs">
                      {property.bathrooms} Bathrooms
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <img
                      src="/parking.svg"
                      alt=""
                      className="h-4 w-4"
                    />

                    <span className="text-[10px] text-[#555555] sm:text-xs">
                      {property.parking} Parking
                    </span>
                  </div>
                </div>

                {/* DESCRIPTION */}

                <h2
                  className="
                    mt-4
                    text-[12px]
                    font-medium
                    leading-4
                    text-[#666666]
                    sm:text-xs
                    sm:leading-5
                  "
                >
                  {property.description}
                </h2>

                {/* PROPERTY DETAILS */}

                <div
                  className="
                    mt-5
                    flex
                    w-full
                    flex-row
                    gap-8
                    border-b
                    border-[#D9D9D9]
                    pb-5
                    sm:gap-12
                    md:gap-16
                    lg:gap-12
                    xl:gap-16
                  "
                >
                  {/* LEFT COLUMN */}

                  <div
                    className="
                      flex
                      min-w-0
                      flex-1
                      flex-col
                      gap-3
                      sm:gap-4
                    "
                  >
                    <p className="text-xs font-medium text-[#777777] sm:text-sm">
                      Property Type
                    </p>

                    <p className="text-xs font-medium text-[#777777] sm:text-sm">
                      Furnishing
                    </p>

                    <p className="text-xs font-medium text-[#777777] sm:text-sm">
                      Status
                    </p>

                    <p className="text-xs font-medium text-[#777777] sm:text-sm">
                      Listed on
                    </p>

                    <p className="text-xs font-medium text-[#777777] sm:text-sm">
                      Property ID
                    </p>
                  </div>

                  {/* RIGHT COLUMN */}

                  <div
                    className="
                      flex
                      min-w-0
                      flex-1
                      flex-col
                      gap-3
                      sm:gap-4
                    "
                  >
                    <p className="truncate text-xs font-semibold text-[#2E2E2E] sm:text-sm">
                      {property.propertyType}
                    </p>

                    <p className="truncate text-xs font-semibold text-[#2E2E2E] sm:text-sm">
                      {property.furnishing}
                    </p>

                    <p className="truncate text-xs font-semibold text-[#117E25] sm:text-sm">
                      {property.status}
                    </p>

                    <p className="truncate text-xs font-semibold text-[#2E2E2E] sm:text-sm">
                      {property.listedOn}
                    </p>

                    <p className="truncate text-xs font-semibold text-[#2E2E2E] sm:text-sm">
                      {property.propertyId}
                    </p>
                  </div>
                </div>

                {/* PROPERTY BADGES */}

                <div className="mt-4 flex flex-wrap gap-2">
                  <img
                    src="/water.svg"
                    alt="Electricity and water"
                    className="h-8.5 w-auto max-w-full object-contain"
                  />

                  <img
                    src="/security.svg"
                    alt="Security and clean environment"
                    className="h-8 w-auto max-w-full object-contain"
                  />
                </div>
              </div>
            </div>

            {/* ================================================= */}
            {/* ABOUT + AMENITIES */}
            {/* ================================================= */}

            <div
              className="
                mt-6
                grid
                grid-cols-1
                gap-7
                border-t
                border-[#D9D9D9]
                pt-6
                sm:mt-7
                sm:gap-8
                md:grid-cols-2
                md:gap-10
                lg:gap-12
              "
            >
              {/* ABOUT */}

              <section>
                <h1
                  className="
                    text-base
                    font-bold
                    leading-tight
                    text-[#2E2E2E]
                    sm:text-[17px]
                    md:text-lg
                  "
                >
                  About this Property
                </h1>

                <p
                  className="
                    mt-3
                    text-[13px]
                    font-medium
                    leading-5
                    text-[#666666]
                    sm:text-sm
                    sm:leading-6
                    md:text-[15px]
                    md:leading-6
                  "
                >
                  {showMoreAbout
                    ? property.about
                    : property.about.slice(0, 180) + "..."}
                </p>

                <button
                  type="button"
                  onClick={() => setShowMoreAbout((current) => !current)}
                  className="
                    mt-3
                    text-[12px]
                    font-bold
                    text-[#1E5A4F]
                    underline
                    underline-offset-2
                    transition
                    hover:opacity-75
                    sm:text-[13px]
                    md:text-sm
                  "
                >
                  {showMoreAbout ? "Show less" : "Show more"}
                </button>
              </section>

              {/* AMENITIES */}

              <section>
                <h1
                  className="
                    text-base
                    font-bold
                    leading-tight
                    text-[#2E2E2E]
                    sm:text-[17px]
                    md:text-lg
                  "
                >
                  Amenities
                </h1>

                <div
                  className="
                    mt-4
                    grid
                    grid-cols-2
                    gap-x-5
                    gap-y-4
                    sm:gap-x-6
                    sm:gap-y-4
                    md:gap-x-7
                    md:gap-y-5
                  "
                >
                  {amenities.map((amenity) => (
                    <div
                      key={amenity.name}
                      className="flex items-center gap-2.5"
                    >
                      <img
                        src={amenity.icon}
                        alt=""
                        className="
                          h-5
                          w-5
                          shrink-0
                          object-contain
                          sm:h-[21px]
                          sm:w-[21px]
                        "
                      />

                      <span
                        className="
                          text-[12px]
                          font-semibold
                          leading-4
                          text-[#555555]
                          sm:text-[13px]
                          sm:leading-5
                          md:text-sm
                        "
                      >
                        {amenity.name}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* ================================================= */}
            {/* LANDMARKS */}
            {/* ================================================= */}

            <section
              className="
                mt-7
                border-t
                border-[#D9D9D9]
                pt-6
                sm:mt-8
                sm:pt-7
                md:mt-9
                md:pt-7
                lg:mt-8
                lg:pt-6
                xl:mt-9
                xl:pt-7
              "
            >
              <h2
                className="
                  text-base
                  font-bold
                  leading-tight
                  text-[#2E2E2E]
                  sm:text-lg
                  md:text-lg
                  lg:text-base
                  xl:text-lg
                "
              >
                Landmarks
              </h2>

              <div
                className="
                  mt-5
                  grid
                  grid-cols-1
                  gap-y-5
                  sm:mt-6
                  sm:grid-cols-2
                  sm:gap-x-8
                  sm:gap-y-6
                  md:grid-cols-3
                  md:gap-x-8
                  md:gap-y-7
                  lg:grid-cols-3
                  lg:gap-x-8
                  lg:gap-y-6
                  xl:grid-cols-5
                  xl:items-center
                  xl:gap-x-6
                  xl:gap-y-7
                "
              >
                {/* LANDMARK 1 */}

                <div className="flex min-w-0 items-center">
                  <img
                    src="/landmark1.svg"
                    alt="Landmark 1"
                    className="
                      block
                      h-[36px]
                      w-[213px]
                      max-w-full
                      object-contain
                      object-left
                    "
                  />
                </div>

                {/* LANDMARK 2 */}

                <div className="flex min-w-0 items-center">
                  <img
                    src="/landmark2.svg"
                    alt="Landmark 2"
                    className="
                      block
                      h-[36px]
                      w-[102px]
                      max-w-full
                      object-contain
                      object-left
                    "
                  />
                </div>

                {/* LANDMARK 3 */}

                <div className="flex min-w-0 items-center">
                  <img
                    src="/landmark3.svg"
                    alt="Landmark 3"
                    className="
                      block
                      h-[36px]
                      w-[135px]
                      max-w-full
                      object-contain
                      object-left
                    "
                  />
                </div>

                {/* LANDMARK 4 */}

                <div className="flex min-w-0 items-center">
                  <img
                    src="/landmark4.svg"
                    alt="Landmark 4"
                    className="
                      block
                      h-[36px]
                      w-[128px]
                      max-w-full
                      object-contain
                      object-left
                    "
                  />
                </div>

                {/* LANDMARK 5 */}

                <div className="flex min-w-0 items-center">
                  <img
                    src="/landmark5.svg"
                    alt="Landmark 5"
                    className="
                      block
                      h-[36px]
                      w-[132px]
                      max-w-full
                      object-contain
                      object-left
                    "
                  />
                </div>
              </div>
            </section>
          </div>

          {/* ================================================= */}
          {/* RIGHT SIDEBAR */}
          {/* ================================================= */}

          <aside className="w-full lg:w-auto">
            {/* LANDLORD CARD */}

            <div
              className="
                rounded-[8px]
                border
                border-[#D9D9D9]
                bg-white
                p-4
                sm:p-5
                lg:p-4
                xl:p-5
              "
            >
              {/* CARD TITLE */}

              <h2
                className="
                  text-[13px]
                  font-semibold
                  text-[#2E2E2E]
                  sm:text-sm
                  md:text-[15px]
                "
              >
                Connect Directly with Landlord
              </h2>

              {/* LANDLORD */}

              <div className="mt-5 flex items-center gap-4">
                <img
                  src="/adewale.svg"
                  alt="Adewale Johnson"
                  className="
                    h-14
                    w-14
                    shrink-0
                    rounded-full
                    object-cover
                    sm:h-16
                    sm:w-16
                    md:h-[68px]
                    md:w-[68px]
                  "
                />

                <div className="min-w-0 flex-1">
                  {/* NAME + VERIFIED */}

                  <div className="flex items-center gap-2">
                    <h3
                      className="
                        whitespace-nowrap
                        text-[14px]
                        font-bold
                        leading-tight
                        text-[#2E2E2E]
                        sm:text-[15px]
                        md:text-base
                        lg:text-[15px]
                        xl:text-base
                      "
                    >
                      Mr. Adewale Johnson
                    </h3>

                    <img
                      src="/verify.svg"
                      alt="Verified"
                      className="
                        h-4
                        w-4
                        shrink-0
                        sm:h-[17px]
                        sm:w-[17px]
                      "
                    />
                  </div>

                  {/* VERIFIED LANDLORD */}

                  <p
                    className="
                      mt-1
                      text-[11px]
                      font-semibold
                      text-[#117E25]
                      sm:text-xs
                      md:text-[13px]
                    "
                  >
                    Verified Landlord
                  </p>

                  {/* LANDLORD INFORMATION */}

                  <div
                    className="
                      mt-2
                      space-y-0.5
                      text-[11px]
                      leading-4
                      text-[#555555]
                      sm:text-xs
                      sm:leading-5
                      md:text-[13px]
                    "
                  >
                    <p>Member since Jan 2026</p>
                    <p>Properties listed: 12</p>
                    <p>{property.response}</p>
                    <p>{property.responseTime}</p>
                  </div>
                </div>
              </div>

              {/* CONNECT */}

              <button
                type="button"
                onClick={() => alert("Chat with landlord coming soon.")}
                className="
                  mt-7
                  flex
                  w-full
                  items-center
                  justify-center
                  rounded-[6px]
                  bg-[#1E5A4F]
                  px-4
                  py-3
                  text-[12px]
                  font-semibold
                  text-white
                  transition
                  hover:opacity-90
                  sm:text-[13px]
                  md:text-sm
                "
              >
                <span className="flex items-center justify-center gap-2">
                  <img
                    src="/chat.svg"
                    alt="Message"
                    className="h-5 w-5 shrink-0 sm:h-[21px] sm:w-[21px]"
                  />

                  <span>Connect with Landlord</span>
                </span>
              </button>

              {/* WHATSAPP */}

              <button
                type="button"
                onClick={() =>
                  window.open(
                    "https://wa.me/2348000000000",
                    "_blank"
                  )
                }
                className="
                  mt-3
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-[6px]
                  border
                  border-[#D9D9D9]
                  bg-white
                  px-4
                  py-3
                  text-[12px]
                  font-semibold
                  text-[#1E5A4F]
                  transition
                  hover:border-[#1E5A4F]
                  hover:bg-[#F7F7F7]
                  sm:text-[13px]
                  md:text-sm
                "
              >
                <span className="text-base sm:text-lg">◉</span>

                <span>Chat on Whatsapp</span>
              </button>
            </div>

            {/* ================================================= */}
            {/* WHY RENT ON SPATIALHUNT */}
            {/* ================================================= */}

            <div
              className="
                mt-6
                rounded-[8px]
                border
                border-[#D9D9D9]
                bg-[#F7F7F7]
                p-4
                sm:mt-9
                sm:p-5
                md:p-6
              "
            >
              <div className="flex items-center gap-2">
                <img
                  src="/why.svg"
                  alt=""
                  className="h-5 w-5 shrink-0 object-contain sm:h-6 sm:w-6"
                />

                <h1
                  className="
                    text-sm
                    font-bold
                    leading-tight
                    text-[#1E5A4F]
                    sm:text-base
                    md:text-lg
                  "
                >
                  Why rent direct on SpatialHunt?
                </h1>
              </div>

              <div
                className="
                  mt-5
                  flex
                  flex-col
                  gap-4
                  sm:mt-6
                  sm:gap-5
                "
              >
                {[
                  "No agent fee",
                  "Direct communication with landlord",
                  "Transparent & secure process",
                  "100% verified landlords",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2.5 sm:gap-3"
                  >
                    <img
                      src="/greengood.svg"
                      alt=""
                      className="h-4 w-4 shrink-0 object-contain sm:h-5 sm:w-5"
                    />

                    <span
                      className="
                        text-xs
                        font-medium
                        leading-5
                        text-[#555555]
                        sm:text-sm
                        sm:leading-6
                        md:text-[15px]
                      "
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ================================================= */}
            {/* MAP */}
            {/* ================================================= */}

            <div
              className="
                mt-5
                overflow-hidden
                rounded-[8px]
                border
                border-[#E1E1E1]
                bg-white
              "
            >
              {/* LOCATION HEADING */}

              <div className="p-4 pb-2">
                <h2
                  className="
                    text-[14px]
                    font-bold
                    text-[#2E2E2E]
                    sm:text-[15px]
                    md:text-base
                  "
                >
                  Location
                </h2>
              </div>

              {/* MAP IMAGE */}

              <a
                href="https://www.google.com/maps/search/?api=1&query=Lekki+Phase+1+Lagos+Nigeria"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  relative
                  block
                  h-[150px]
                  w-full
                  overflow-hidden
                  sm:h-[180px]
                  md:h-[190px]
                  lg:h-[145px]
                  xl:h-[170px]
                "
              >
                <img
                  src="/map.svg"
                  alt="Map showing Lekki Phase 1 Lagos"
                  className="h-full w-full object-cover"
                />
              </a>

              {/* LOCATION + VIEW MAP */}

              <div
                className="
                  flex
                  flex-col
                  gap-3
                  p-4
                "
              >
                {/* LOCATION */}

                <div className="flex items-start gap-2">
                  <img
                    src="/maplocation.svg"
                    alt="Location"
                    className="
                      mt-0.5
                      h-5
                      w-5
                      shrink-0
                      object-contain
                    "
                  />

                  <p
                    className="
                      font-medium
                      text-[11px]
                      leading-4
                      text-[#555555]
                      sm:text-xs
                      sm:leading-5
                      md:text-[13px]
                    "
                  >
                    Lekki Phase 1, Lagos, Nigeria
                  </p>
                </div>

                {/* VIEW ON MAP BUTTON */}

                <a
                  href="https://www.google.com/maps/search/?api=1&query=Lekki+Phase+1+Lagos+Nigeria"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex
                    w-fit
                    items-center
                    gap-2
                    rounded-[5px]
                    border
                    border-[#2E2E2E]
                    bg-transparent
                    px-3
                    py-1.5
                    text-[10px]
                    font-semibold
                    text-[#2E2E2E]
                    transition
                    hover:border-[#1E5A4F]
                    hover:text-[#1E5A4F]
                    sm:px-3.5
                    sm:py-2
                    sm:text-[11px]
                    md:text-xs
                  "
                >
                  <img
                    src="/mapicon.svg"
                    alt=""
                    className="
                      h-4
                      w-4
                      shrink-0
                      object-contain
                      sm:h-[17px]
                      sm:w-[17px]
                    "
                  />

                  <span>View on Map</span>
                </a>
              </div>
            </div>
          </aside>
        </div>

        {/* ===================================================== */}
        {/* MOBILE/DESKTOP BOTTOM ACTION BAR */}
        {/* ===================================================== */}

        <div
          className="
            sticky
            bottom-0
            z-20
            mt-8
            flex
            flex-col
            gap-3
            rounded-[8px]
            border
            border-[#D9D9D9]
            bg-white
            p-3
            shadow-sm
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:px-4
            md:gap-4
            lg:mt-7
          "
        >
          {/* PRICE + FEATURES */}

          <div
            className="
              flex
              flex-wrap
              items-center
              gap-2
              sm:gap-2.5
              md:gap-3
            "
          >
            {/* PRICE */}

            <span
              className="
                whitespace-nowrap
                text-sm
                font-bold
                text-[#2E2E2E]
                sm:text-base
                lg:text-lg
              "
            >
              {property.price}
            </span>

            {/* DIVIDER */}

            <div className="hidden h-5 w-px bg-[#D9D9D9] sm:block" />

            {/* BEDS */}

            <button
              type="button"
              className="
                flex
                items-center
                gap-1.5
                rounded-[5px]
                border
                border-[#D9D9D9]
                bg-transparent
                px-2
                py-1.5
                text-[10px]
                font-medium
                text-[#555555]
                transition
                hover:border-[#1E5A4F]
                hover:text-[#1E5A4F]
                sm:px-2.5
                sm:py-1.5
                sm:text-[11px]
                md:text-xs
              "
            >
              <img
                src="/beds.svg"
                alt=""
                className="h-4 w-4 shrink-0 object-contain sm:h-[17px] sm:w-[17px]"
              />

              <span>{property.beds} Beds</span>
            </button>

            {/* BATHROOMS */}

            <button
              type="button"
              className="
                flex
                items-center
                gap-1.5
                rounded-[5px]
                border
                border-[#D9D9D9]
                bg-transparent
                px-2
                py-1.5
                text-[10px]
                font-medium
                text-[#555555]
                transition
                hover:border-[#1E5A4F]
                hover:text-[#1E5A4F]
                sm:px-2.5
                sm:py-1.5
                sm:text-[11px]
                md:text-xs
              "
            >
              <img
                src="/bathroom.svg"
                alt=""
                className="h-4 w-4 shrink-0 object-contain sm:h-[17px] sm:w-[17px]"
              />

              <span>{property.bathrooms} Bathrooms</span>
            </button>

            {/* PARKING */}

            <button
              type="button"
              className="
                flex
                items-center
                gap-1.5
                rounded-[5px]
                border
                border-[#D9D9D9]
                bg-transparent
                px-2
                py-1.5
                text-[10px]
                font-medium
                text-[#555555]
                transition
                hover:border-[#1E5A4F]
                hover:text-[#1E5A4F]
                sm:px-2.5
                sm:py-1.5
                sm:text-[11px]
                md:text-xs
              "
            >
              <img
                src="/parking.svg"
                alt=""
                className="h-4 w-4 shrink-0 object-contain sm:h-[17px] sm:w-[17px]"
              />

              <span>{property.parking} Parking</span>
            </button>

            {/* SWIMMING POOL */}

            <button
              type="button"
              className="
                flex
                items-center
                gap-1.5
                rounded-[5px]
                border
                border-[#D9D9D9]
                bg-transparent
                px-2
                py-1.5
                text-[10px]
                font-medium
                text-[#555555]
                transition
                hover:border-[#1E5A4F]
                hover:text-[#1E5A4F]
                sm:px-2.5
                sm:py-1.5
                sm:text-[11px]
                md:text-xs
              "
            >
              <img
                src="/swimming.svg"
                alt=""
                className="h-4 w-4 shrink-0 object-contain sm:h-[17px] sm:w-[17px]"
              />

              <span>Swimming Pool</span>
            </button>
          </div>

          {/* ACTIONS */}

          <div
            className="
              flex
              w-full
              items-center
              gap-2
              sm:w-auto
            "
          >
            {/* SAVE PROPERTY */}

            <button
              type="button"
              onClick={() => setSaved((current) => !current)}
              className="
                flex
                flex-1
                items-center
                justify-center
                gap-2
                rounded-[6px]
                border
                border-[#D9D9D9]
                bg-white
                px-4
                py-2.5
                text-[10px]
                font-medium
                text-[#555555]
                transition
                hover:border-[#1E5A4F]
                hover:text-[#1E5A4F]
                sm:flex-none
                sm:text-[11px]
                md:text-xs
              "
            >
              <img
                src="/save.svg"
                alt=""
                className="h-4 w-4"
              />

              {saved ? "Saved" : "Save Property"}
            </button>

            {/* REQUEST TO RENT */}

            <button
              type="button"
              onClick={handleRequest}
              className={`
                flex
                flex-1
                items-center
                justify-center
                gap-2
                rounded-[6px]
                px-4
                py-2.5
                text-[10px]
                font-medium
                transition
                sm:flex-none
                sm:min-w-[145px]
                sm:text-[11px]
                md:text-xs
                ${
                  requested
                    ? "bg-[#117E25] text-white"
                    : "bg-[#F4B942] text-[#2E2E2E]"
                }
              `}
            >
              <img
                src="/request.svg"
                alt=""
                className="h-4 w-4"
              />

              {requested ? "Request Sent" : "Request to Rent"}
            </button>
          </div>
        </div>

        {/* ===================================================== */}
        {/* FLOATING SHARE BUTTON */}
        {/* ===================================================== */}

        <button
          type="button"
          onClick={handleShare}
          className="
            fixed
            bottom-24
            right-4
            z-30
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-[#D9D9D9]
            bg-white
            shadow-md
            transition
            hover:border-[#1E5A4F]
            sm:bottom-20
            sm:right-6
          "
          aria-label="Share property"
        >
          <img
            src="/share.svg"
            alt="Share"
            className="h-4 w-4"
          />
        </button>
      </div>
    </main>
  );
}

