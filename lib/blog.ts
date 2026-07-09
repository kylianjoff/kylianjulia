import fs from 'fs';
import path from 'path';

export interface BlogPostMeta {
    slug: string;
    title: string;
    date: string;
    author: string;
    tags: string[];
    excerpt: string;
    thumbnail: string | null;
}

export interface BlogPost extends BlogPostMeta {
    content: string; // markdown brut
}

const DATA_DIR = path.join(process.cwd(), 'public');

export function getBlogIndex(): BlogPostMeta[] {
    try {
        const raw = fs.readFileSync(path.join(DATA_DIR, 'blog-index.json'), 'utf8');
        return JSON.parse(raw) as BlogPostMeta[];
    } catch {
        return [];
    }
}

export function getBlogPost(slug: string): BlogPost | null {
    try {
        const raw = fs.readFileSync(
            path.join(DATA_DIR, 'posts-data', `${slug}.json`),
            'utf8'
        );
        return JSON.parse(raw) as BlogPost;
    } catch {
        return null;
    }
}
