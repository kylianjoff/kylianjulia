// Client minimal pour lire des fichiers dans le repo de contenu (privé) via l'API GitHub.

export interface GithubConfig {
    owner: string;
    repo: string;
    branch: string;
    token: string;
}

export function getGithubConfig(): GithubConfig {
    const owner = process.env.BLOG_REPO_OWNER;
    const repo = process.env.BLOG_REPO_NAME;
    const branch = process.env.BLOG_REPO_BRANCH || 'main';
    const token = process.env.BLOG_REPO_TOKEN;

    if (!owner || !repo || !token) {
        throw new Error('Variables BLOG_REPO_OWNER / BLOG_REPO_NAME / BLOG_REPO_TOKEN manquantes');
    }

    return { owner, repo, branch, token };
}

/** Récupère un fichier texte (raw) du repo de contenu. Renvoie null si le fichier n'existe pas. */
export async function getGithubTextFile(
    { owner, repo, branch, token }: GithubConfig,
    filePath: string
): Promise<string | null> {
    const res = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents/${encodeGithubPath(filePath)}?ref=${encodeURIComponent(branch)}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/vnd.github.raw',
                'X-GitHub-Api-Version': '2022-11-28',
            },
        }
    );

    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`GitHub ${res.status} sur ${filePath}: ${await res.text()}`);
    return res.text();
}

/** Récupère un fichier binaire (image) du repo de contenu. Renvoie null si absent. */
export async function getGithubBinaryFile(
    { owner, repo, branch, token }: GithubConfig,
    filePath: string
): Promise<{ buffer: ArrayBuffer; contentType: string } | null> {
    const res = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents/${encodeGithubPath(filePath)}?ref=${encodeURIComponent(branch)}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/vnd.github.raw',
                'X-GitHub-Api-Version': '2022-11-28',
            },
        }
    );

    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`GitHub ${res.status} sur ${filePath}: ${await res.text()}`);

    const contentType = res.headers.get('content-type') || 'application/octet-stream';
    return { buffer: await res.arrayBuffer(), contentType };
}

function encodeGithubPath(filePath: string): string {
    return filePath.split('/').map(encodeURIComponent).join('/');
}
