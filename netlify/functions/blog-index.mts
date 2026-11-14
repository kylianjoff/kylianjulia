import { getStore } from '@netlify/blobs';

export default async () => {
    const store = getStore('blog');
    const index = (await store.get('blog-index.json', { type: 'json' })) ?? [];

    return Response.json(index, {
        headers: { 'cache-control': 'public, max-age=60' },
    });
};

export const config = { path: '/api/blog/index' };
