"use client"

import { useState } from "react";
import CookieUsageModal from "../cookie-usage";
import { Card } from "../ui/card";

export function CookieModal() {
    const [cookieModalOpen, setCookieModalOpen] = useState(true);

    function cookiesOk() {
        // Logique ajout cookie
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