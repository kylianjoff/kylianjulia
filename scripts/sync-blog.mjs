// Déclenche la synchronisation du blog (GET manifest distant, diff, mise à jour des Netlify Blobs).
// Usage:
//   npm run blog:sync                → cible http://localhost:8888 (netlify dev doit tourner)
//   npm run blog:sync -- --prod      → cible BLOG_SITE_URL (variable d'env, ex: https://kylianjulia.fr)
//   npm run blog:sync -- --force     → force la resynchro de tous les articles

import fs from 'fs';
import path from 'path';

function loadEnvFile() {
    const envPath = path.resolve('.env');
    if (!fs.existsSync(envPath)) return;

    for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;

        const eqIdx = trimmed.indexOf('=');
        if (eqIdx === -1) continue;

        const key = trimmed.slice(0, eqIdx).trim();
        const value = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
        if (!(key in process.env)) process.env[key] = value;
    }
}

loadEnvFile();

const args = process.argv.slice(2);
const isProd = args.includes('--prod');
const force = args.includes('--force');

const secret = process.env.BLOG_SYNC_SECRET;
if (!secret) {
    console.error('❌ BLOG_SYNC_SECRET manquant dans .env');
    process.exit(1);
}

const baseUrl = isProd
    ? process.env.BLOG_SITE_URL
    : 'http://localhost:8888';

if (!baseUrl) {
    console.error('❌ BLOG_SITE_URL manquant dans .env (nécessaire pour --prod)');
    process.exit(1);
}

const url = `${baseUrl.replace(/\/$/, '')}/api/blog/sync${force ? '?force=1' : ''}`;

console.log(`→ Sync ${isProd ? 'production' : 'local'} : ${url}`);

try {
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'x-sync-secret': secret },
    });

    const body = await res.json().catch(() => null);

    if (!res.ok) {
        console.error(`❌ Échec (${res.status})`, body ?? await res.text());
        process.exit(1);
    }

    console.log(`✅ ${body.synced.length} synchronisé(s), ${body.removed.length} supprimé(s), ${body.errors.length} erreur(s)`);
    if (body.synced.length) console.log('   Synchronisés :', body.synced.join(', '));
    if (body.removed.length) console.log('   Supprimés    :', body.removed.join(', '));
    if (body.errors.length) console.log('   Erreurs      :', JSON.stringify(body.errors));
} catch (err) {
    console.error('❌ Impossible de joindre le serveur.', isProd ? '' : "Le serveur 'netlify dev' est-il lancé ?");
    console.error(err.message);
    process.exit(1);
}
