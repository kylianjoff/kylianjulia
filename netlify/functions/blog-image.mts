import { getGithubBinaryFile, getGithubConfig } from './lib/github';

export default async (req: Request) => {
    const url = new URL(req.url);
    const slug = url.searchParams.get('slug');
    const file = url.searchParams.get('file');
    if (!slug || !file) return new Response('Missing slug/file', { status: 400 });

    const github = getGithubConfig();
    const image = await getGithubBinaryFile(github, `posts/${slug}/images/${file}`);
    if (!image) return new Response('Not found', { status: 404 });

    return new Response(image.buffer, {
        headers: {
            'content-type': image.contentType,
            'cache-control': 'public, max-age=3600',
        },
    });
};

export const config = { path: '/api/blog/image' };
