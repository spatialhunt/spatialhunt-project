import Image from "next/image";

const recommended = [
  {
    image: "/recommended1.svg",
    alt: "Recommended property",
  },
  {
    image: "/recommended2.svg",
    alt: "Recommended property",
  },
  {
    image: "/recommended3.svg",
    alt: "Recommended property",
  },
];

const Recommended = () => {
  return (
    <section className="w-full bg-[#FAFAF8]">
      {/* ================= TITLE ================= */}
      <h1 className="px-2 pt-4 text-base font-bold text-[#2E2E2E] sm:text-lg">
        Recommended For You
      </h1>

      {/* ================= RECOMMENDED CARDS ================= */}
      <div
        className="
          grid
          w-full
          grid-cols-1
          gap-4
          px-2
          pb-4
          pt-4
          sm:grid-cols-2
          lg:grid-cols-3
        "
      >
        {recommended.map((item, index) => (
          <div
            key={index}
            className="
              w-full
              min-w-0
              overflow-hidden
              rounded-lg
            "
          >
            <Image
              src={item.image}
              alt={item.alt}
              width={400}
              height={250}
              className="
                h-auto
                w-full
                object-contain
              "
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Recommended;