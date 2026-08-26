import NewsletterForm from '@/components/newsletter-form';
import { getBlogIndex } from '@/lib/blog';
import Link from 'next/link';

export const metadata = {
    title: 'Blog — Kylian JULIA',
    description: 'Articles sur le développement web, la cybersécurité et la vie étudiante.',
};

export default function BlogPage() {
    const posts = getBlogIndex();

    return (
        <main className="max-w-4xl mx-auto px-6 py-16">

            <NewsletterForm />

            <div className="mb-12 flex items-center gap-5">
                <h1 className="text-4xl font-bold text-white">Blog</h1>
                <div className="h-px flex-1 bg-border" />
                <span className="font-mono text-xs text-muted">
                    {posts.length} article{posts.length !== 1 ? 's' : ''}
                </span>
            </div>

            {posts.length === 0 ? (
                <p className="text-muted text-center py-24">Aucun article pour le moment.</p>
            ) : (
                <div className="flex flex-col gap-5">
                    {posts.map(post => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-0.5"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <h2 className="text-xl font-semibold leading-snug transition-colors group-hover:text-primary">
                                    {post.title}
                                </h2>
                                <time className="shrink-0 font-mono text-xs text-muted pt-1">{post.date}</time>
                            </div>

                            {post.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map(tag => (
                                        <span
                                            key={tag}
                                            className="px-2.5 py-0.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-[11px] font-mono"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <p className="text-sm leading-relaxed text-muted line-clamp-2">{post.excerpt}</p>

                            <div className="flex items-center justify-between text-xs text-muted/60 mt-1">
                                <span>{post.author}</span>
                                <span className="group-hover:text-primary transition-colors">Lire →</span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </main>
    );
}