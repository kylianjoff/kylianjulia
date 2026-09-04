'use client';

import NewsletterForm from '@/components/newsletter-form';
import { BlogPost } from '@/lib/blog';
import { renderMarkdown } from '@/lib/markdown';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

function useSlug(): string | null {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Netlify réécrit /blog/<slug> vers /blog/post/ en conservant l'URL affichée.
    const segments = pathname.split('/').filter(Boolean);
    const pathSlug = segments[0] === 'blog' && segments[1] && segments[1] !== 'post' ? segments[1] : null;

    return pathSlug ?? searchParams.get('slug');
}

function BlogPostContent() {
    const slug = useSlug();
    const [post, setPost] = useState<BlogPost | null | undefined>(undefined);

    useEffect(() => {
        if (!slug) {
            setPost(null);
            return;
        }
        setPost(undefined);
        fetch(`/api/blog/post?slug=${encodeURIComponent(slug)}`)
            .then(res => (res.ok ? res.json() : null))
            .then(setPost)
            .catch(() => setPost(null));
    }, [slug]);

    useEffect(() => {
        if (post) document.title = `${post.title} — Kylian JULIA`;
    }, [post]);

    if (post === undefined) {
        return <p className="text-muted text-center py-24">Chargement…</p>;
    }

    if (post === null) {
        return (
            <div className="text-center py-24">
                <p className="text-muted mb-6">Article introuvable.</p>
                <Link href="/blog" className="text-primary hover:underline">← Retour au blog</Link>
            </div>
        );
    }

    return (
        <>
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
        </>
    );
}

export default function BlogPostPage() {
    return (
        <main className="max-w-3xl mx-auto px-6 py-14">
            <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors mb-10 group"
            >
                <span className="group-hover:-translate-x-0.5 transition-transform inline-block">←</span>
                Retour au blog
            </Link>

            <Suspense fallback={<p className="text-muted text-center py-24">Chargement…</p>}>
                <BlogPostContent />
            </Suspense>
        </main>
    );
}
