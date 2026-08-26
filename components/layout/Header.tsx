import Link from "next/link";
import Image from "next/image";
import { JobSeekingModal } from "./JobSeekingModal";

export function Header() {
    return (
        <header className="border border-border shadow-lg shadow-primary/15 w-[80%] px-10 flex justify-between items-center rounded-[30px] text-foreground bg-card/80 backdrop-blur-md fixed top-4 left-1/2 -translate-x-1/2 z-50">
            <div className="flex items-center gap-4 p-2">
                <Image
                    src="/images/favicon.ico"
                    alt="Logo"
                    width={48}
                    height={84}
                />
                <Link href="/" className="text-foreground font-bold text-xl">Kylian JULIA</Link>
            </div>
            <div className="flex items-center gap-4">
                <nav className="container mx-auto flex items-center gap-6 p-4">
                    <Link href="/about" className="text-muted transition-colors font-semibold hover:text-primary">À propos</Link>
                    <Link href="https://projets.kylianjulia.fr" target="_blank" rel="noopener noreferrer" className="text-muted transition-colors font-semibold hover:text-primary">Projets</Link>
                    <Link href="/blog" className="text-muted transition-colors font-semibold hover:text-primary">Blog</Link>
                    <Link href="/cheatsheets" className="text-muted transition-colors font-semibold hover:text-primary">Cheat Sheets</Link>
                </nav>
                <JobSeekingModal />
            </div>
        </header>
    )
}