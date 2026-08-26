"use client"

import { BriefcaseBusiness } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import JobSeekingContent from "../job-seeking";
import { Button } from "../ui/button";

const COOKIE_CONSENT_NAME = "job-seeking-modal-dismissed";

function hasCookieConsentCookie() {
    return document.cookie
        .split(";")
        .map((cookie) => cookie.trim())
        .some((cookie) => cookie === `${COOKIE_CONSENT_NAME}=true`);
}

export function JobSeekingModal() {
    const [cookieModalOpen, setCookieModalOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        try {
            const consentDismissed = hasCookieConsentCookie();
            setCookieModalOpen(!consentDismissed);
        } catch {
            setCookieModalOpen(true);
        }
    }, []);

    useEffect(() => {
        if (!cookieModalOpen) return;

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                cookiesOk();
            }
        }

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [cookieModalOpen]);

    function cookiesOk() {
        try {
            document.cookie = `${COOKIE_CONSENT_NAME}=true; path=/; SameSite=Lax`;
        } catch {

        }
        setCookieModalOpen(false);
    }

    return (
        <>
            <Button
                type="button"
                variant="secondary"
                size="icon"
                aria-label="Ouvrir les informations sur ma recherche de stage"
                title="Recherche de stage"
                onClick={() => setCookieModalOpen(true)}
                className="rounded-full shadow-lg shadow-primary/25 animate-pulse"
            >
                <BriefcaseBusiness aria-hidden="true" />
            </Button>

            {mounted && cookieModalOpen && createPortal(
                <div className="fixed inset-0 z-[100] flex min-h-dvh items-center justify-center overflow-y-auto p-4 sm:p-6">
                    <button
                        type="button"
                        aria-label="Fermer la fenêtre"
                        className="absolute inset-0 cursor-default bg-black/65 backdrop-blur-[2px] transition-opacity"
                        onClick={cookiesOk}
                    />
                    <JobSeekingContent onClose={cookiesOk} />
                </div>,
                document.body,
            )}
        </>
    )
}