import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import NewsletterForm from '@/components/newsletter-form';
import { renderMarkdown } from '@/lib/markdown';
import { getManifest, getPostBySlug } from '@/lib/blog-source';

export async function generateStaticParams() {
    const manifest = await getManifest();
    return manifest.posts.map(post => ({ slug: post.id }));
}

// Slug absent au build -> vraie 404 (pas de génération à la volée possible avec output: export).
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);
    if (!post) return {};

    const title = `${post.title} — Kylian JULIA`;
    const description = post.excerpt || 'Articles de blog de Kylian JULIA.';
    const images = post.thumbnail ? [post.thumbnail] : undefined;

    return {
        title,
        description,
        alternates: { canonical: `/blog/${slug}` },
        openGraph: {
            type: 'article',
            siteName: 'Kylian JULIA',
            title,
            description,
            images,
            authors: [post.author || 'Kylian JULIA'],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images,
        },
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);
    if (!post) notFound();

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        image: post.thumbnail ?? undefined,
        author: { '@type': 'Person', name: post.author || 'Kylian JULIA' },
        datePublished: post.date,
        url: `https://kylianjulia.fr/blog/${post.slug}`,
    };

    return (
        <main className="max-w-3xl mx-auto px-6 py-14">
            <script
                type="application/ld+json"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors mb-10 group"
            >
                <span className="group-hover:-translate-x-0.5 transition-transform inline-block">←</span>
                Retour au blog
            </Link>

            <header className="mb-12">
                {post.thumbnail && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="w-full aspect-video object-cover rounded-2xl mb-8 border border-border/50"
                    />
                )}

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

            <article>
                {renderMarkdown(post.content)}
            </article>

            <NewsletterForm />
        </main>
    );
}
