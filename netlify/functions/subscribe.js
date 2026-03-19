export default async (request) => {
    if (request.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 });
    }

    let email;
    try {
        const body = await request.json();
        email = body?.email;
    } catch {
        return new Response(JSON.stringify({ error: 'Corps de requête invalide' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
        });
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return new Response(JSON.stringify({ error: 'Email invalide' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
        });
    }

    const apiKey = Netlify.env.get('BREVO_API_KEY');
    const listId = Number(Netlify.env.get('BREVO_LIST_ID'));

    if (!apiKey || !listId) {
        return new Response(JSON.stringify({ error: 'Configuration serveur manquante' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
        });
    }

    const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        email,
        listIds: [listId],
        updateEnabled: true, // ré-abonne si déjà existant
        }),
    });

    if (!brevoResponse.ok && brevoResponse.status !== 204) {
        const errorBody = await brevoResponse.text();
        console.error('Erreur Brevo:', brevoResponse.status, errorBody);
        return new Response(JSON.stringify({ error: 'Erreur lors de l\'inscription' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
        });
    }

    return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
};

export const config = {
    path: '/api/subscribe',
};
