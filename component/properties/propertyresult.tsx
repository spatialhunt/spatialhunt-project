"use client";

import React from "react";
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
  },
];

const PropertyResults = () => {
  return (
    <section className="w-full min-w-0">

      {/* ================= PROPERTY CARDS ================= */}

      <div className="flex w-full flex-col gap-1.5 sm:gap-2">

        {properties.map((property) => (
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

    </section>
  );
};

export default PropertyResults;