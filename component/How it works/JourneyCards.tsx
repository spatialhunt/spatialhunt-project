import Image from "next/image";

type JourneyStep = {
  number: number;
  title: string;
  description: string;
  icon: string;
};

type JourneyCardProps = {
  title: string;
  description: string;
  steps: JourneyStep[];
  background: string;
};

const tenantSteps: JourneyStep[] = [
  {
    number: 1,
    title: "Search & Explore",
    description:
      "Search verified properties that fit your budget and lifestyle.",
    icon: "/akar-icons_search.svg",
  },
  {
    number: 2,
    title: "View Details",
    description:
      "Check property details, amenities, location and landlord info.",
    icon: "/ci_house-01.svg",
  },
  {
    number: 3,
    title: "Chat Directly",
    description:
      "Communicate directly with the landlord. No middlemen.",
    icon: "/f7_text-bubble.svg",
  },
  {
    number: 4,
    title: "Schedule & Inspect",
    description:
      "Schedule inspection and view the property at your convenience.",
    icon: "/akar-icons_schedule.svg",
  },
  {
    number: 5,
    title: "Rent with Peace of Mind",
    description:
      "Agree, pay securely and move in. Zero stress.",
    icon: "/akar-icons_key.svg",
  },
];

const landlordSteps: JourneyStep[] = [
  {
    number: 1,
    title: "Create Account",
    description:
      "Sign up and verify your identity as a landlord.",
    icon: "/akar-icons_person-add.svg",
  },
  {
    number: 2,
    title: "List Property",
    description:
      "Add your property details, photos, and pricing.",
    icon: "/basil_add-outline.svg",
  },
  {
    number: 3,
    title: "Get Verified",
    description:
      "We verify your property and publish it.",
    icon: "/reicon_verify.svg",
  },
  {
    number: 4,
    title: "Receive Enquiries",
    description:
      "Interested tenants chat with you directly.",
    icon: "/basil_chat-outline.svg",
  },
  {
    number: 5,
    title: "Find & Message Tenants",
    description:
      "Choose the best tenants and manage with ease.",
    icon: "/iconamoonprofile-light.svg",
  },
];

const agentSteps: JourneyStep[] = [
  {
    number: 1,
    title: "Become a Verified Agent",
    description:
      "Sign up and get verified as a trusted real estate agent.",
    icon: "/tdesign_gesture-typing.svg",
  },
  {
    number: 2,
    title: "Add Properties",
    description:
      "Add properties for your clients to showcase.",
    icon: "/lucide-lab_houses.svg",
  },
  {
    number: 3,
    title: "Get Quality Leads",
    description:
      "Receive genuine leads from serious tenants & buyers.",
    icon: "/f7_chart-bar.svg",
  },
  {
    number: 4,
    title: "Manage Clients",
    description:
      "Communicate and follow up with clients easily.",
    icon: "/bi_chat-left-text.svg",
  },
  {
    number: 5,
    title: "Close Deals",
    description:
      "Close more deals and grow your reputation.",
    icon: "/fa_handshake-o.svg",
  },
];

function JourneyCard({
  title,
  description,
  steps,
  background,
}: JourneyCardProps) {
  return (
    <div className={`rounded-2xl p-6 ${background}`}>
      {/* Card Heading */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-[#1E5A4F]">
          {title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-gray-600">
          {description}
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-6">
        {steps.map((step) => (
          <div
            key={step.number}
            className="flex items-start gap-4"
          >
            {/* Icon */}
            <div className="shrink-0">
              <Image
                src={step.icon}
                alt={step.title}
                width={48}
                height={48}
              />
            </div>

            {/* Step Content */}
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1E5A4F] text-xs font-bold text-white">
                  {step.number}
                </span>

                <h4 className="text-sm font-semibold text-[#333333]">
                  {step.title}
                </h4>
              </div>

              <p className="mt-1 text-xs leading-5 text-gray-600">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function JourneyCards() {
  return (
    <section className="w-full px-6 pb-16">
      <div className="mx-auto grid max-w-[1340px] grid-cols-1 gap-6 md:grid-cols-3">

        {/* Tenants */}
        <JourneyCard
          title="For Tenants"
          description="Find verified homes and rent with confidence."
          steps={tenantSteps}
          background="bg-[#E8F2EB]"
        />

        {/* Landlords */}
        <JourneyCard
          title="For Landlords"
          description="List your property and get quality tenants."
          steps={landlordSteps}
          background="bg-[#FFF3D6]"
        />

        {/* Agents */}
        <JourneyCard
          title="For Agents"
          description="Grow your business with verified listings."
          steps={agentSteps}
          background="bg-[#E8F2EB]"
        />

      </div>
    </section>
  );
}

export default JourneyCards;