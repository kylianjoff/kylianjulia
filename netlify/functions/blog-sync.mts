import { getStore } from '@netlify/blobs';
import { getGithubConfig, getGithubTextFile } from './lib/github';
import { makeExcerpt, parseFrontmatter, rewriteContentImages, toImageProxyUrl } from './lib/post-parser';

interface ManifestEntry {
    id: string;
    lastUpdate: string;
}

interface Manifest {
    lastUpdate: string;
    posts: ManifestEntry[];
}

interface PostMeta {
    slug: string;
    title: string;
    date: string;
    author: string;
    tags: string[];
    excerpt: string;
    thumbnail: string | null;
}

function normalizeTags(tags: string[] | string | undefined): string[] {
    if (!tags) return [];
    return Array.isArray(tags) ? tags : [tags];
}

function sortByDateDesc(a: PostMeta, b: PostMeta): number {
    if (!a.date) return 1;
    if (!b.date) return -1;
    const [da, ma, ya] = a.date.split('/').map(Number);
    const [db, mb, yb] = b.date.split('/').map(Number);
    return new Date(yb, mb - 1, db).getTime() - new Date(ya, ma - 1, da).getTime();
}

export default async (req: Request) => {
    const url = new URL(req.url);
    const providedSecret = req.headers.get('x-sync-secret') ?? url.searchParams.get('secret');
    if (!process.env.BLOG_SYNC_SECRET || providedSecret !== process.env.BLOG_SYNC_SECRET) {
        return new Response('Unauthorized', { status: 401 });
    }
    const force = url.searchParams.get('force') === '1';

    try {
        const github = getGithubConfig();
        const store = getStore('blog');

        const manifestRaw = await getGithubTextFile(github, 'manifest.json');
        if (!manifestRaw) {
            return new Response('manifest.json introuvable dans le repo de contenu', { status: 502 });
        }
        const manifest: Manifest = JSON.parse(manifestRaw);

        const prevManifestRaw = await store.get('manifest.json', { type: 'text' });
        const prevManifest: Manifest = prevManifestRaw ? JSON.parse(prevManifestRaw) : { lastUpdate: '', posts: [] };

        const prevById = new Map(prevManifest.posts.map(p => [p.id, p.lastUpdate]));
        const nextById = new Map(manifest.posts.map(p => [p.id, p.lastUpdate]));

        const toSync = force ? manifest.posts : manifest.posts.filter(p => prevById.get(p.id) !== p.lastUpdate);
        const toRemove = prevManifest.posts.filter(p => !nextById.has(p.id));

        const errors: { id: string; error: string }[] = [];

        for (const entry of toSync) {
            try {
                const md = await getGithubTextFile(github, `posts/${entry.id}/post.md`);
                if (!md) throw new Error('post.md introuvable');

                const { data, content } = parseFrontmatter(md);
                const rewritten = rewriteContentImages(content, entry.id);
                const thumbnail = data.thumbnail ? toImageProxyUrl(entry.id, data.thumbnail) : null;

                const meta: PostMeta = {
                    slug: entry.id,
                    title: data.title || entry.id,
                    date: data.date || '',
                    author: data.author || '',
                    tags: normalizeTags(data.tags),
                    excerpt: data.excerpt || makeExcerpt(content),
                    thumbnail,
                };

                await store.setJSON(`posts-data/${entry.id}.json`, { ...meta, content: rewritten });
            } catch (err) {
                errors.push({ id: entry.id, error: (err as Error).message });
            }
        }

        for (const entry of toRemove) {
            await store.delete(`posts-data/${entry.id}.json`);
        }

        // Reconstruit l'index à partir de tous les articles présents dans le manifest.
        const index: PostMeta[] = [];
        for (const entry of manifest.posts) {
            const stored = await store.get(`posts-data/${entry.id}.json`, { type: 'json' }) as (PostMeta & { content: string }) | null;
            if (stored) {
                const { content: _content, ...meta } = stored;
                index.push(meta);
            }
        }
        index.sort(sortByDateDesc);

        await store.setJSON('blog-index.json', index);
        await store.setJSON('manifest.json', manifest);

        return Response.json({
            synced: toSync.map(p => p.id),
            removed: toRemove.map(p => p.id),
            errors,
            total: index.length,
        });
    } catch (err) {
        return Response.json({ error: (err as Error).message }, { status: 500 });
    }
};

export const config = { path: '/api/blog/sync' };
