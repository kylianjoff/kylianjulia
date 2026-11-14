"use client"

import { useEffect, useState } from "react";
import CookieUsageModal from "../cookie-usage";

const COOKIE_CONSENT_NAME = "cookie-consent-dismissed";

function hasCookieConsentCookie() {
    return document.cookie
        .split(";")
        .map((cookie) => cookie.trim())
        .some((cookie) => cookie === `${COOKIE_CONSENT_NAME}=true`);
}

export function CookieModal() {
    const [cookieModalOpen, setCookieModalOpen] = useState(false);

    useEffect(() => {
        try {
            const consentDismissed = hasCookieConsentCookie();
            setCookieModalOpen(!consentDismissed);
        } catch {
            // Fallback for restricted environments where cookie access is unavailable.
            setCookieModalOpen(true);
        }
    }, []);

    function cookiesOk() {
        try {
            // Session cookie: no Max-Age/Expires so it is cleared when browser session ends.
            document.cookie = `${COOKIE_CONSENT_NAME}=true; path=/; SameSite=Lax`;
        } catch {
            // Ignore cookie write errors and just close the modal for this render.
        }
        setCookieModalOpen(false);
    }

    return (
        cookieModalOpen && (
            <CookieUsageModal
                onOk={cookiesOk}
            />
        )        
    );
}