import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const firstName = formData.get("firstName")?.toString() ?? "";
  const lastName = formData.get("lastName")?.toString() ?? "";
  const email = formData.get("email")?.toString() ?? "";
  const subject = formData.get("subject")?.toString() ?? "";
  const message = formData.get("message")?.toString() ?? "";

  if (!firstName || !lastName || !email || !subject || !message) {
    return NextResponse.json(
      { error: "Veuillez remplir tous les champs." },
      { status: 400 },
    );
  }

  const payload = new URLSearchParams({
    "form-name": "contact",
    "bot-field": "",
    firstName,
    lastName,
    email,
    subject,
    message,
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
    // Continue to the Formspree fallback.
  }

  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;

  if (formspreeId) {
    try {
      const formspreeResponse = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: payload,
      });

      if (formspreeResponse.ok) {
        return NextResponse.json({ success: true });
      }
    } catch {
      // Will fall through to the error response.
    }
  }

  console.info("[contact] Nouveau message", {
    firstName,
    lastName,
    email,
    subject,
    message,
  });

  return NextResponse.json(
    { error: "Le message n'a pas pu être envoyé. Veuillez réessayer plus tard." },
    { status: 502 },
  );
}
