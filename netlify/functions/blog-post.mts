import { getStore } from '@netlify/blobs';

export default async (req: Request) => {
    const slug = new URL(req.url).searchParams.get('slug');
    if (!slug) return new Response('Missing slug', { status: 400 });

    const store = getStore('blog');
    const post = await store.get(`posts-data/${slug}.json`, { type: 'json' });
    if (!post) return new Response('Not found', { status: 404 });

    return Response.json(post, {
        headers: { 'cache-control': 'public, max-age=60' },
    });
};

export const config = { path: '/api/blog/post' };
