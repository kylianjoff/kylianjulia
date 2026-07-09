import Link from "next/link";

const posts = [
  {
    title: "Article à venir",
    date: "Bientôt",
    excerpt: "Les premiers articles de ce blog seront publiés très prochainement.",
    href: "/blog",
  },
  {
    title: "Article à venir",
    date: "Bientôt",
    excerpt: "Restez connecté pour découvrir les prochains articles.",
    href: "/blog",
  },
  {
    title: "Article à venir",
    date: "Bientôt",
    excerpt: "Des articles sur le développement web, la cybersécurité et plus encore.",
    href: "/blog",
  },
];

export default function BlogSection() {
  return (
    <section className="py-28 px-6 bg-secondary border-t border-border/40">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="mb-16 flex items-center gap-5">
          <h2 className="text-3xl font-bold">Blog</h2>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Cards grid */}
        <div className="grid gap-5 md:grid-cols-3">
          {posts.map((post, i) => (
            <Link
              key={i}
              href={post.href}
              className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1"
            >
              <p className="mb-3 font-mono text-xs text-muted">{post.date}</p>
              <h3 className="mb-3 font-semibold transition-colors group-hover:text-primary">
                {post.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
