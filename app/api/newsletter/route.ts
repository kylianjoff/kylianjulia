import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const formData = await request.formData();

    const email = formData.get("email")?.toString() ?? "";

    if (!email) {
        return NextResponse.json(
            { error: "Veuillez fournir un email" },
            { status: 400 },
        );
    }

    const payload = new URLSearchParams({
        "form-name": "newsletter",
        "bot-field": "",
        email,
    }).toString();

    try {
        const netlifyResponse = await fetch(`${request.nextUrl.origin}/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: payload,
        });

        if (netlifyResponse.ok) {
            return NextResponse.json({ success: true });
        }
    } catch {

    }

    const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;

    if (formspreeId) {
        try {
            const formspreeResponse = await fetch(`https://formspree.io/f/${formspreeId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: payload,
            });

            if (formspreeResponse.ok) {
                return NextResponse.json({ success: true });
            }
        } catch {

        }
    }

    console.info("[newsletter] Nouvelle inscription", {
        email,
    });

    return NextResponse.json(
        { error: "Une erreur est survenue lors de l'inscription à la newsletter." },
        { status: 500 },
    );
}

