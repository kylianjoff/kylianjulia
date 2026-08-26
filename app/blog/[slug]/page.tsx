import NewsletterForm from '@/components/newsletter-form';
import { getBlogPost, getBlogIndex } from '@/lib/blog';
import { renderMarkdown } from '@/lib/markdown';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
    return getBlogIndex().map(p => ({ slug: p.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = getBlogPost(slug);
    if (!post) return {};
    return {
        title: `${post.title} — Kylian JULIA`,
        description: post.excerpt,
    };
}

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = getBlogPost(slug);
    if (!post) notFound();

    return (
        <main className="max-w-3xl mx-auto px-6 py-14">

            {/* Retour */}
            <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors mb-10 group"
            >
                <span className="group-hover:-translate-x-0.5 transition-transform inline-block">←</span>
                Retour au blog
            </Link>

            {/* Header */}
            <header className="mb-12">
                {post.thumbnail && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="w-full aspect-video object-cover rounded-2xl mb-8 border border-border/50"
                    />
                )}

                {/* Tags */}
                {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-5">
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

                <h1 className="text-4xl font-bold text-white leading-tight mb-4">
                    {post.title}
                </h1>

                <div className="flex items-center gap-2 text-sm text-muted mb-6">
                    <span>{post.author}</span>
                    <span className="text-primary/40">•</span>
                    <time>{post.date}</time>
                </div>

                <p className="text-slate-400 italic text-base leading-relaxed pl-4 border-l-2 border-primary/40">
                    {post.excerpt}
                </p>
            </header>

            {/* Contenu markdown rendu */}
            <article>
                {renderMarkdown(post.content)}
            </article>

            <NewsletterForm />

        </main>
    );
}
