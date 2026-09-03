"use client";

import React, { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import PropertyCard from "./propertycard";

const properties = [
  {
    id: "two-bedroom-apartment",
    image: "/2bedroom.svg",
    title: "2 Bedroom Apartment",
    location: "Lekki Phase 1, Lagos",
    price: "₦2,500,000/year",
    beds: 2,
    bathrooms: 2,
    parking: 1,
    description:
      "Lovely 2 bedroom apartment in a secure estate with 24/7 electricity and security.",

    purpose: "rent",
    propertyType: "2 Bedroom Apartment",
    priceRange: "₦2,500,000/year",
    furnishing: "Semi-Furnished",
    security: true,
    swimmingPool: true,
    airConditioning: true,
    verifiedProperty: true,
  },

  {
    id: "mini-flat",
    image: "/miniflat.svg",
    title: "Mini Flat",
    location: "Ikeja, Lagos",
    price: "₦800,000/year",
    beds: 1,
    bathrooms: 1,
    parking: 1,
    description:
      "Standard mini flat with steady power and water supply.",

    purpose: "rent",
    propertyType: "Mini Flat",
    priceRange: "₦800,000/year",
    furnishing: "Unfurnished",
    security: true,
    swimmingPool: false,
    airConditioning: false,
    verifiedProperty: true,
  },

  {
    id: "four-bedroom-duplex",
    image: "/4bedroom.svg",
    title: "4 Bedroom Duplex",
    location: "Lekki, Lagos",
    price: "₦85,000,000",
    beds: 4,
    bathrooms: 4,
    parking: 2,
    description:
      "Beautiful 4 bedroom duplex with modern facilities and ample parking space.",

    purpose: "sale",
    propertyType: "4 Bedroom Duplex",
    priceRange: "₦85,000,000",
    furnishing: "Furnished",
    security: true,
    swimmingPool: true,
    airConditioning: true,
    verifiedProperty: true,
  },

  {
    id: "three-bedroom-flat",
    image: "/3bedroom.svg",
    title: "3 Bedroom Flat",
    location: "Ikeja, Lagos",
    price: "₦3,000,000/year",
    beds: 3,
    bathrooms: 3,
    parking: 1,
    description:
      "Spacious 3 bedroom flat in the Government Residential Area, serene and calm location.",

    purpose: "rent",
    propertyType: "3 Bedroom Flat",
    priceRange: "₦3,000,000/year",
    furnishing: "Semi-Furnished",
    security: true,
    swimmingPool: false,
    airConditioning: true,
    verifiedProperty: true,
  },

  {
    id: "luxury-condo",
    image: "/luxurycondo.svg",
    title: "Luxury Condo",
    location: "Victoria Island, Lagos",
    price: "₦3,000,000,000",
    beds: 4,
    bathrooms: 4,
    parking: 2,
    description:
      "Luxury Condo with stunning views and top-notch facilities.",

    purpose: "sale",
    propertyType: "Luxury Condo",
    priceRange: "₦3,000,000,000",
    furnishing: "Furnished",
    security: true,
    swimmingPool: true,
    airConditioning: true,
    verifiedProperty: true,
  },
];

const PropertyResults = () => {
  const searchParams = useSearchParams();

  const filteredProperties = useMemo(() => {
    const purpose = searchParams.get("purpose");
    const location = searchParams.get("location");
    const propertyType = searchParams.get("propertyType");
    const priceRange = searchParams.get("priceRange");
    const bedrooms = searchParams.get("bedrooms");
    const furnishing = searchParams.get("furnishing");

    const parking = searchParams.get("parking");
    const security = searchParams.get("security");
    const swimmingPool = searchParams.get("swimmingPool");
    const airConditioning = searchParams.get("airConditioning");
    const verifiedProperty = searchParams.get("verifiedProperty");

    return properties.filter((property) => {
      /* ================= PURPOSE ================= */

      if (purpose && property.purpose !== purpose) {
        return false;
      }

      /* ================= LOCATION ================= */

      if (
        location &&
        !property.location.toLowerCase().includes(location.toLowerCase())
      ) {
        return false;
      }

      /* ================= PROPERTY TYPE ================= */

      if (
        propertyType &&
        property.propertyType.toLowerCase() !== propertyType.toLowerCase()
      ) {
        return false;
      }

      /* ================= PRICE ================= */

      if (priceRange && property.priceRange !== priceRange) {
        return false;
      }

      /* ================= BEDROOMS ================= */

      if (bedrooms) {
        if (bedrooms === "1 Bedroom" && property.beds !== 1) {
          return false;
        }

        if (bedrooms === "2 Bedrooms" && property.beds !== 2) {
          return false;
        }

        if (bedrooms === "3 Bedrooms" && property.beds !== 3) {
          return false;
        }

        if (bedrooms === "4+ Bedrooms" && property.beds < 4) {
          return false;
        }
      }

      /* ================= FURNISHING ================= */

      if (
        furnishing &&
        property.furnishing.toLowerCase() !== furnishing.toLowerCase()
      ) {
        return false;
      }

      /* ================= MORE FILTERS ================= */

      if (parking === "true" && property.parking < 1) {
        return false;
      }

      if (security === "true" && !property.security) {
        return false;
      }

      if (swimmingPool === "true" && !property.swimmingPool) {
        return false;
      }

      if (airConditioning === "true" && !property.airConditioning) {
        return false;
      }

      if (verifiedProperty === "true" && !property.verifiedProperty) {
        return false;
      }

      return true;
    });
  }, [searchParams]);

  return (
    <section className="w-full min-w-0">

      {/* ================= RESULT COUNT ================= */}

      <div className="mb-4">
        <p className="text-sm text-[#666666]">
          Showing{" "}
          <span className="font-semibold text-[#2E2E2E]">
            {filteredProperties.length}
          </span>{" "}
          {filteredProperties.length === 1 ? "property" : "properties"}
        </p>
      </div>

      {/* ================= PROPERTY CARDS ================= */}

      {filteredProperties.length > 0 ? (
        <div className="flex w-full flex-col gap-1.5 sm:gap-2">

          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              id={property.id}
              image={property.image}
              title={property.title}
              location={property.location}
              price={property.price}
              beds={property.beds}
              bathrooms={property.bathrooms}
              parking={property.parking}
              description={property.description}
            />
          ))}

        </div>
      ) : (
        /* ================= NO RESULTS ================= */

        <div
          className="
            flex
            min-h-[250px]
            w-full
            flex-col
            items-center
            justify-center
            rounded-[8px]
            border
            border-[#D9D9D9]
            bg-[#F7F7F7]
            px-5
            text-center
          "
        >
          <h2 className="text-base font-semibold text-[#2E2E2E]">
            No properties found
          </h2>

          <p className="mt-2 text-sm text-[#666666]">
            Try changing or clearing some of your filters.
          </p>
        </div>
      )}

    </section>
  );
};

export default PropertyResults;