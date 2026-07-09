import { getBlogIndex } from '@/lib/blog';
import Link from 'next/link';

export default function BlogSection() {
    const posts = getBlogIndex().slice(0, 3);

    return (
        <section className="py-28 px-6 bg-secondary border-t border-border/40">
            <div className="max-w-5xl mx-auto">

                <div className="mb-16 flex items-center gap-5">
                    <h2 className="text-3xl font-bold">Blog</h2>
                    <div className="h-px flex-1 bg-border" />
                    <Link
                        href="/blog"
                        className="text-xs text-muted hover:text-primary transition-colors font-mono"
                    >
                        Tous les articles →
                    </Link>
                </div>

                {posts.length === 0 ? (
                    <p className="text-muted text-sm">Aucun article pour le moment.</p>
                ) : (
                    <div className="grid gap-5 md:grid-cols-3">
                        {posts.map(post => (
                            <Link
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1"
                            >
                                <p className="mb-3 font-mono text-xs text-muted">{post.date}</p>
                                <h3 className="mb-3 font-semibold leading-snug transition-colors group-hover:text-primary">
                                    {post.title}
                                </h3>
                                <p className="mb-4 text-sm leading-relaxed text-muted line-clamp-3 flex-1">
                                    {post.excerpt}
                                </p>
                                {post.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5">
                                        {post.tags.slice(0, 3).map(tag => (
                                            <span
                                                key={tag}
                                                className="px-2 py-0.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-mono"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
