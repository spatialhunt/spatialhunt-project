import Link from "next/link";

const articles = [
  {
    slug: "renting-safely-in-lagos",
    category: "Tenant guide",
    title: "How to rent safely in Lagos",
    excerpt:
      "Verify listings, inspect before you pay, and use escrow for your first year's rent.",
    readTime: "5 min read",
  },
  {
    slug: "landlord-verification-explained",
    category: "For landlords",
    title: "Landlord verification explained",
    excerpt:
      "What we check, how long it takes, and why verified landlords get more enquiries.",
    readTime: "4 min read",
  },
  {
    slug: "understanding-escrow-payments",
    category: "Payments",
    title: "Understanding escrow rent payments",
    excerpt:
      "How funds are held, when they're released, and what happens if something goes wrong.",
    readTime: "6 min read",
  },
];

export default function ResourcesPage() {
  return (
    <main className="bg-[#FAFAF8]">
      <section className="w-full px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-[1000px]">
          <p className="text-sm font-bold uppercase tracking-wide text-[#1E5A4F]">
            Resources
          </p>
          <h1 className="mt-3 text-[32px] font-bold text-[#2E2E2E] sm:text-[38px]">
            Guides for tenants & landlords
          </h1>
          <p className="mt-3 max-w-140 text-sm text-[#555555] sm:text-base">
            Practical articles on finding a home, listing property, and paying rent securely
            on SpatialHunt.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <article
                key={article.slug}
                className="flex flex-col rounded-[8px] border border-[#EEEEEE] bg-white p-5 transition hover:border-[#1E5A4F]/30"
              >
                <span className="w-fit rounded-[5px] bg-[#EAF3F0] px-2.5 py-1 text-[10px] font-semibold uppercase text-[#1E5A4F]">
                  {article.category}
                </span>
                <h2 className="mt-3 text-lg font-bold text-[#2E2E2E]">{article.title}</h2>
                <p className="mt-2 flex-1 text-sm text-[#777777]">{article.excerpt}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-[#999999]">{article.readTime}</span>
                  <span className="text-sm font-semibold text-[#1E5A4F]">Coming soon</span>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-[8px] border border-[#FFF4D6] bg-[#FFF6D9] px-5 py-6 text-center">
            <p className="text-sm font-semibold text-[#C99A20]">More articles on the way</p>
            <p className="mt-1 text-sm text-[#777777]">
              Full articles will be published here. Need help now?{" "}
              <Link href="/dashboard/tenant/help" className="font-semibold text-[#1E5A4F] hover:underline">
                Visit Help & Support
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
