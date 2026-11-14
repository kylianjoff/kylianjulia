"use client";

import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  function goBack() {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }

    window.location.assign("/");
  }

  function goHome() {
    window.location.assign("/");
  }

  return (
    <main className="relative isolate flex min-h-[calc(100vh-13rem)] items-center justify-center overflow-hidden px-6 py-20">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.12),transparent_45%)]" />

      <div className="w-full max-w-xl text-center">
        <p className="mb-5 font-mono text-sm uppercase tracking-[0.3em] text-primary">
          Erreur 404
        </p>
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Cette page n&apos;existe pas.
        </h1>
        <p className="mx-auto mb-9 max-w-md text-base leading-relaxed text-muted">
          L&apos;adresse demandée n&apos;existe pas ou n&apos;est plus disponible.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" onClick={goHome} className="hover:cursor-pointer">
            <Home aria-hidden="true" />
            Retour à l&apos;accueil
          </Button>
          <Button variant="outline" size="lg" onClick={goBack} className="hover:cursor-pointer">
            <ArrowLeft aria-hidden="true" />
            Page précédente
          </Button>
        </div>
      </div>
    </main>
  );
}