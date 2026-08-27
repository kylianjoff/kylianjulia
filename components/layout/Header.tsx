"use client";

import Link from "next/link";
import Image from "next/image";
import { JobSeekingModal } from "./JobSeekingModal";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Header() {
    const [menuMobileOpen, setMenuMobileOpen] = useState(false);

    const closeMobileMenu = () => {
        setMenuMobileOpen(false);
    };

    return (
        <header
            className="
                fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[80%]
                border border-border
                rounded-[30px]
                shadow-lg shadow-primary/15
                text-foreground
                bg-card/80
                backdrop-blur-md
            "
        >
            <div className="flex items-center justify-between px-10">
                {/* Logo */}
                <div className="flex items-center gap-4 p-2">
                    <Image
                        src="/images/favicon.ico"
                        alt="Logo"
                        width={48}
                        height={48}
                    />

                    <Link
                        href="/"
                        className="text-foreground font-bold text-xl"
                        onClick={closeMobileMenu}
                    >
                        Kylian JULIA
                    </Link>
                </div>

                {/* Desktop navigation */}
                <div className="hidden lg:flex items-center gap-6">
                    <nav className="flex items-center gap-6">
                        <Link
                            href="/about"
                            className="text-muted transition-colors font-semibold hover:text-primary"
                        >
                            À propos
                        </Link>

                        <Link
                            href="https://projets.kylianjulia.fr"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted transition-colors font-semibold hover:text-primary"
                        >
                            Projets
                        </Link>

                        <Link
                            href="/blog"
                            className="text-muted transition-colors font-semibold hover:text-primary"
                        >
                            Blog
                        </Link>

                        <Link
                            href="/cheatsheets"
                            className="text-muted transition-colors font-semibold hover:text-primary"
                        >
                            Cheat Sheets
                        </Link>
                    </nav>

                    <JobSeekingModal />
                </div>

                {/* Mobile button */}
                <button
                    type="button"
                    onClick={() => setMenuMobileOpen((prev) => !prev)}
                    className="lg:hidden p-2"
                    aria-label={
                        menuMobileOpen
                            ? "Fermer le menu"
                            : "Ouvrir le menu"
                    }
                    aria-expanded={menuMobileOpen}
                >
                    {menuMobileOpen ? (
                        <X className="h-6 w-6" />
                    ) : (
                        <Menu className="h-6 w-6" />
                    )}
                </button>
            </div>

            {/* Mobile navigation */}
            {menuMobileOpen && (
                <div className="lg:hidden border-t border-border px-6 py-5">
                    <nav className="flex flex-col items-center gap-5">
                        <Link
                            href="/about"
                            onClick={closeMobileMenu}
                            className="text-muted transition-colors font-semibold hover:text-primary"
                        >
                            À propos
                        </Link>

                        <Link
                            href="https://projets.kylianjulia.fr"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={closeMobileMenu}
                            className="text-muted transition-colors font-semibold hover:text-primary"
                        >
                            Projets
                        </Link>

                        <Link
                            href="/blog"
                            onClick={closeMobileMenu}
                            className="text-muted transition-colors font-semibold hover:text-primary"
                        >
                            Blog
                        </Link>

                        <Link
                            href="/cheatsheets"
                            onClick={closeMobileMenu}
                            className="text-muted transition-colors font-semibold hover:text-primary"
                        >
                            Cheat Sheets
                        </Link>

                        <JobSeekingModal />
                    </nav>
                </div>
            )}
        </header>
    );
}