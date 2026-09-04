// Accès aux articles directement depuis le repo de contenu GitHub, utilisé UNIQUEMENT au build
// (generateStaticParams / generateMetadata / page serveur de app/blog/[slug]). Contrairement aux
// fonctions Netlify (netlify/functions/blog-*), ce module tourne dans `next build`, pas à la volée.

import { getGithubConfig, getGithubTextFile } from '../netlify/functions/lib/github';
import { makeExcerpt, parseFrontmatter, rewriteContentImages, toImageProxyUrl } from '../netlify/functions/lib/post-parser';
import type { BlogPost } from './blog';

interface ManifestEntry {
    id: string;
    lastUpdate: string;
}

interface Manifest {
    lastUpdate: string;
    posts: ManifestEntry[];
}

function normalizeTags(tags: string[] | string | undefined): string[] {
    if (!tags) return [];
    return Array.isArray(tags) ? tags : [tags];
}

export async function getManifest(): Promise<Manifest> {
    const github = getGithubConfig();
    const raw = await getGithubTextFile(github, 'manifest.json');
    if (!raw) return { lastUpdate: '', posts: [] };
    return JSON.parse(raw);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
    const github = getGithubConfig();
    const md = await getGithubTextFile(github, `posts/${slug}/post.md`);
    if (!md) return null;

    const { data, content } = parseFrontmatter(md);
    return {
        slug,
        title: data.title || slug,
        date: data.date || '',
        author: data.author || '',
        tags: normalizeTags(data.tags),
        excerpt: data.excerpt || makeExcerpt(content),
        thumbnail: data.thumbnail ? toImageProxyUrl(slug, data.thumbnail) : null,
        content: rewriteContentImages(content, slug),
    };
}
