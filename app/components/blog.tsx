'use client';

import { BlogPostMeta } from '@/lib/blog';
import BlogCard from './blog-card';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function BlogSection() {
    const [posts, setPosts] = useState<BlogPostMeta[]>([]);

    useEffect(() => {
        fetch('/api/blog/index')
            .then(res => res.json())
            .then((all: BlogPostMeta[]) => setPosts(all.slice(0, 3)))
            .catch(() => setPosts([]));
    }, []);

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
                            <BlogCard key={post.slug} post={post} compact />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
