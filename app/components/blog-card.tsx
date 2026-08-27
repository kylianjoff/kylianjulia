"use client";

import { BlogPostMeta } from '@/lib/blog';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface BlogCardProps {
    post: BlogPostMeta;
    compact?: boolean;
}

export default function BlogCard({ post, compact = false }: BlogCardProps) {
    const thumbnail = post.thumbnail?.replace(/^\/assets\/blogs\//, '/posts/');

    const [littleScreen, setLittleScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setLittleScreen(window.innerWidth < 650);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Link
            href={`/blog/${post.slug}`}
            className={`group overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 ${thumbnail ? (compact || littleScreen) ? 'flex flex-col' : 'grid grid-cols-[180px_1fr] md:grid-cols-[220px_1fr]' : ''}`}
        >
            {thumbnail && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={thumbnail}
                    alt=""
                    className={`w-full object-cover ${(compact || littleScreen) ? 'h-32' : 'h-full min-h-28'}`}
                />
            )}

            <div className={`flex min-w-0 flex-col justify-center ${(compact || littleScreen) ? 'p-4' : 'p-5 md:p-6'}`}>
                <div className="flex items-start justify-between gap-3">
                    <h2 className={`${(compact || littleScreen) ? 'text-base' : 'text-xl'} font-semibold leading-snug transition-colors group-hover:text-primary`}>
                        {post.title}
                    </h2>
                    <time className="shrink-0 pt-1 font-mono text-xs text-muted">{post.date}</time>
                </div>

                <p className={`mt-3 text-sm leading-relaxed text-muted ${(compact || littleScreen) ? 'line-clamp-2' : 'line-clamp-3'}`}>
                    {post.excerpt}
                </p>

                <div className="mt-4 flex items-center justify-between gap-3">
                    {post.tags.length > 0 && (
                        <div className="flex min-w-0 flex-wrap gap-1.5">
                            {post.tags.slice(0, (compact || littleScreen) ? 2 : 4).map(tag => (
                                <span key={tag} className="rounded-full border border-primary/20 bg-primary/5 px-2 py-0.5 text-[10px] font-mono text-primary">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                    <span className="ml-auto shrink-0 text-xs text-muted/60 transition-colors group-hover:text-primary">Lire →</span>
                </div>
            </div>
        </Link>
    );
}