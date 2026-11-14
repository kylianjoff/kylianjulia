'use client';

import { useEffect, useState } from 'react';
import { LOADING_PHRASES } from '@/lib/loading-phrases';

export function LoadingScreen() {
  const [mounted, setMounted] = useState(true);
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [phrase, setPhrase] = useState<string | null>(null);

  useEffect(() => {
    setPhrase(LOADING_PHRASES[Math.floor(Math.random() * LOADING_PHRASES.length)]);

    const start = Date.now();
    const minDuration = 500; // durée minimale d'affichage, évite le flash

    // Progression simulée, ralentit à l'approche de 90%
    const progressTimer = setInterval(() => {
      setProgress((p) => (p >= 90 ? p : p + (90 - p) / 10 + 1));
    }, 120);

    const finish = () => {
      const elapsed = Date.now() - start;
      const wait = Math.max(0, minDuration - elapsed);
      setTimeout(() => {
        clearInterval(progressTimer);
        setProgress(100);
        setTimeout(() => setVisible(false), 250);
        setTimeout(() => setMounted(false), 650);
      }, wait);
    };

    if (document.readyState === 'complete') {
      finish();
    } else {
      window.addEventListener('load', finish);
    }

    return () => {
      clearInterval(progressTimer);
      window.removeEventListener('load', finish);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0b1120',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.4s ease',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <div
        style={{
          width: 320,
          borderRadius: 10,
          overflow: 'hidden',
          background: 'rgba(13,20,38,0.92)',
          boxShadow: '0 14px 44px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.07)',
        }}
      >
        {/* Barre de titre façon terminal */}
        <div
          style={{
            height: 28,
            background: 'rgba(22,34,58,0.98)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '0 10px',
          }}
        >
          <div style={{ display: 'flex', gap: 5 }}>
            {(['#ef4444', '#f59e0b', '#22c55e'] as const).map((color) => (
              <div key={color} style={{ width: 9, height: 9, borderRadius: '50%', background: color, opacity: 0.82 }} />
            ))}
          </div>
          <span style={{ flex: 1, textAlign: 'center', color: '#94a3b8', fontSize: 10, fontWeight: 500, marginRight: 22 }}>
            boot.sh
          </span>
        </div>

        {/* Contenu */}
        <div style={{ padding: '18px 16px', fontFamily: 'monospace', fontSize: 11, color: '#94a3b8' }}>
          <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
            <span style={{ color: '#22d3ee' }}>kylian@pc</span>
            <span style={{ color: '#475569' }}>~</span>
            <span style={{ color: '#64748b' }}>$</span>
            <span style={{ color: '#e2e8f0' }}>
              {phrase ?? 'Chargement...'}
              <span className="ks-cursor" style={{ color: '#e2e8f0' }}>█</span>
            </span>
          </div>

          {/* Barre de progression */}
          <div
            style={{
              height: 4,
              borderRadius: 999,
              background: 'rgba(148,163,184,0.15)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${progress}%`,
                borderRadius: 999,
                background: 'linear-gradient(90deg, #3b82f6, #22d3ee)',
                transition: 'width 0.15s linear',
              }}
            />
          </div>
          <div style={{ marginTop: 6, display: 'flex', justifyContent: 'space-between', fontSize: 9.5, color: '#475569' }}>
            <span>Chargement du système</span>
            <span>{Math.min(100, Math.round(progress))}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
