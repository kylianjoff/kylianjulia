'use client';

import NewsletterForm from '@/components/newsletter-form';
import BlogCard from '@/app/components/blog-card';
import { BlogPostMeta } from '@/lib/blog';
import { useEffect, useState } from 'react';

export default function BlogPage() {
    const [posts, setPosts] = useState<BlogPostMeta[] | null>(null);

    useEffect(() => {
        fetch('/api/blog/index')
            .then(res => res.json())
            .then(setPosts)
            .catch(() => setPosts([]));
    }, []);

    return (
        <main className="max-w-4xl mx-auto px-6 py-16">

            <NewsletterForm />

            <div className="mb-12 flex items-center gap-5">
                <h1 className="text-4xl font-bold text-white">Blog</h1>
                <div className="h-px flex-1 bg-border" />
                <span className="font-mono text-xs text-muted">
                    {posts === null ? '…' : `${posts.length} article${posts.length !== 1 ? 's' : ''}`}
                </span>
            </div>

            {posts === null ? (
                <p className="text-muted text-center py-24">Chargement…</p>
            ) : posts.length === 0 ? (
                <p className="text-muted text-center py-24">Aucun article pour le moment.</p>
            ) : (
                <div className="flex flex-col gap-5">
                    {posts.map(post => (
                        <BlogCard key={post.slug} post={post} />
                    ))}
                </div>
            )}
        </main>
    );
}