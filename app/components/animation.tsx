'use client';

import Image from 'next/image';
import { useState, useEffect, useRef, useCallback } from 'react';

// ─── Window definitions ───────────────────────────────────────────────────────

const WINDOW_DEFS = [
  {
    id: "terminal",
    title: "Terminal",
    delay: 700,
    width: 400,
    height: 215,
  },
  {
    id: "editor",
    title: "portfolio.ts — Code",
    delay: 1400,
    width: 375,
    height: 252,
  },
  {
    id: "files",
    title: "Files",
    delay: 2100,
    width: 275,
    height: 188,
  },
  {
    id: "sysinfo",
    title: "Kylian Info",
    delay: 2800,
    width: 255,
    height: 158,
  },
  {
    id: "avatar",
    title: "kylian.png",
    delay: 3500,
    width: 400,
    height: 400,
  },
] as const;

type WindowId = (typeof WINDOW_DEFS)[number]['id'];
type WinState  = { id: WindowId; x: number; y: number; visible: boolean; zIndex: number };

// ─── Window contents ──────────────────────────────────────────────────────────

function TerminalContent() {
  return (
    <div style={{ padding: '10px 12px', fontFamily: 'monospace', fontSize: 10, lineHeight: 1.65, color: '#94a3b8' }}>
      <div style={{ display: 'flex', gap: 6 }}>
        <span style={{ color: '#22d3ee' }}>kylian@pc</span>
        <span style={{ color: '#475569' }}>~</span>
        <span style={{ color: '#64748b' }}>$</span>
        <span style={{ color: '#e2e8f0' }}>whoami</span>
      </div>
      <div style={{ color: '#475569', display: 'flex' }}>kylian</div>
      <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
        <span style={{ color: '#22d3ee' }}>kylian@pc</span>
        <span style={{ color: '#475569' }}>~</span>
        <span style={{ color: '#64748b' }}>$</span>
        <span style={{ color: '#e2e8f0' }}>ls ./projects</span>
      </div>
      <div style={{ color: '#3b82f6', display: 'flex' }}>portfolio/&nbsp;&nbsp;blog/&nbsp;&nbsp;tools/&nbsp;&nbsp;lab/</div>
      <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
        <span style={{ color: '#22d3ee' }}>kylian@pc</span>
        <span style={{ color: '#475569' }}>~</span>
        <span style={{ color: '#64748b' }}>$</span>
        <span style={{ color: '#e2e8f0' }}>git status</span>
      </div>
      <div style={{ color: '#22c55e', display: 'flex' }}>On branch main — nothing to commit ✓</div>
      <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
        <span style={{ color: '#22d3ee' }}>kylian@pc</span>
        <span style={{ color: '#475569' }}>~</span>
        <span style={{ color: '#64748b' }}>$</span>
        <span style={{ color: '#e2e8f0', animation: 'pulse 1s infinite' }}>█</span>
      </div>
    </div>
  );
}

function EditorContent() {
  const rows: [string, string][][] = [
    [['const ', '#60a5fa'], ['portfolio', '#e2e8f0'], [' = {', '#64748b']],
    [['  name', '#38bdf8'], [':  ', '#64748b'], ["'Kylian Julia'", '#86efac'], [',', '#64748b']],
    [['  stack', '#38bdf8'], [':', '#64748b'], [' [', '#64748b']],
    [["    'Next.js'", '#86efac'], [', ', '#64748b'], ["'TypeScript'", '#86efac'], [',', '#64748b']],
    [["    'Tailwind'", '#86efac'], [', ', '#64748b'], ["'Framer'", '#86efac'], [',', '#64748b']],
    [['  ]', '#64748b'], [',', '#64748b']],
    [['  open', '#38bdf8'], [':', '#64748b'], ['  true', '#f472b6'], [',', '#64748b']],
    [['  year', '#38bdf8'], [':', '#64748b'], ['  2025', '#fb923c']],
    [['}', '#64748b']],
  ];
  return (
    <div style={{ padding: '10px 12px', fontFamily: 'monospace', fontSize: 10, lineHeight: 1.65, background: 'rgba(15,23,42,0.5)' }}>
      {rows.map((tokens, i) => (
        <div key={i} style={{ display: 'flex' }}>
          <span style={{ color: '#1e3a5f', userSelect: 'none', minWidth: 16, textAlign: 'right', marginRight: 12 }}>{i + 1}</span>
          <span>
            {tokens.map(([text, color], j) => (
              <span key={j} style={{ color }}>{text}</span>
            ))}
          </span>
        </div>
      ))}
    </div>
  );
}

function FilesContent() {
  const items = [
    { name: 'Desktop',   icon: '🖥️' },
    { name: 'Documents', icon: '📁' },
    { name: 'Downloads', icon: '⬇️' },
    { name: 'portfolio', icon: '📁' },
    { name: 'Pictures',  icon: '🖼️' },
    { name: 'README.md', icon: '📄' },
  ];
  return (
    <div style={{ padding: '10px 12px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px 8px' }}>
      {items.map(({ name, icon }) => (
        <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'default', userSelect: 'none' }}>
          <span style={{ fontSize: 18 }}>{icon}</span>
          <span style={{ color: '#94a3b8', fontSize: 9, textAlign: 'center', lineHeight: 1.3 }}>{name}</span>
        </div>
      ))}
    </div>
  );
}

function SysInfoContent() {
  const rows = [
    ['Identity',     'Kylian JULIA'],
    ['Age', '22 years old'],
    ['Position',  'IT student'],
    ['School',     'ISIMA'],
    ['IQ', '18'],
    ['RAM',    '4.2 GiB / 16 GiB'],
  ];
  return (
    <div style={{ padding: '10px 12px', fontFamily: 'monospace', fontSize: 9.5, lineHeight: 1.7, color: '#64748b' }}>
      {rows.map(([label, value]) => (
        <div key={label} style={{ display: 'flex', gap: 8 }}>
          <span style={{ color: '#3b82f6', minWidth: 52 }}>{label}</span>
          <span style={{ color: label === 'RAM' ? '#22d3ee' : '#cbd5e1' }}>{value}</span>
        </div>
      ))}
    </div>
  );
}

function AvatarContent() {
  return (
    <Image
      src="/images/avatar.png"
      alt="Avatar"
      width={400}
      height={400}
    />
  )
}

const WINDOW_CONTENTS: Record<WindowId, React.FC> = {
  terminal: TerminalContent,
  editor:   EditorContent,
  files:    FilesContent,
  sysinfo:  SysInfoContent,
  avatar:   AvatarContent,
};

// ─── Draggable window frame ───────────────────────────────────────────────────

function WindowFrame({
  id,
  title,
  x,
  y,
  zIndex,
  visible,
  width,
  height,
  scale,
  onTitleMouseDown,
  onWindowMouseDown,
  children,
}: {
  id: string;
  title: string;
  x: number;
  y: number;
  zIndex: number;
  visible: boolean;
  width: number;
  height: number;
  scale: number;
  children: React.ReactNode;
  onTitleMouseDown: (e: React.MouseEvent, id: string) => void;
  onWindowMouseDown: (id: string) => void;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        height,

        zIndex,

        borderRadius: 10,
        overflow: "hidden",

        background: "rgba(13,20,38,0.92)",
        backdropFilter: "blur(22px)",

        boxShadow:
          "0 14px 44px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.07)",

        opacity: visible ? 1 : 0,

        transform: visible
          ? `scale(${scale})`
          : `scale(${scale * 0.91}) translateY(8px)`,

        transformOrigin: "top left",

        transition:
          "opacity 0.4s cubic-bezier(.4,0,.2,1), transform 0.4s cubic-bezier(.4,0,.2,1)",

        pointerEvents: visible ? "auto" : "none",
      }}
      onMouseDown={() => onWindowMouseDown(id)}
    >
      {/* Title bar */}
      <div
        style={{
          height: 28,

          background: "rgba(22,34,58,0.98)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",

          display: "flex",
          alignItems: "center",
          gap: 8,

          paddingLeft: 10,
          paddingRight: 10,

          cursor: "grab",
          userSelect: "none",
        }}
        onMouseDown={(e) => {
          e.stopPropagation();
          onTitleMouseDown(e, id);
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 5,
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          {(["#ef4444", "#f59e0b", "#22c55e"] as const).map(
            (color, i) => (
              <div
                key={i}
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: "50%",
                  background: color,
                  opacity: 0.82,
                }}
              />
            )
          )}
        </div>

        <span
          style={{
            flex: 1,
            textAlign: "center",
            color: "#94a3b8",
            fontSize: 10,
            fontWeight: 500,
            marginRight: 22,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </span>
      </div>

      {/* Content */}
      <div
        style={{
          height: height - 28,
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function AnimationSection() {
  const [dateTimeStr, setDateTimeStr] = useState('');
  const desktopRef   = useRef<HTMLDivElement>(null);
  const winStatesRef = useRef<WinState[]>([]);
  const maxZRef      = useRef(10);
  const dragRef      = useRef<{
    id: string;
    startMouseX: number; startMouseY: number;
    startWinX: number;   startWinY: number;
  } | null>(null);

  const [winStates, _setWinStates] = useState<WinState[]>(() =>
    WINDOW_DEFS.map(w => ({ id: w.id, x: 0, y: 0, visible: false, zIndex: 10 }))
  );

  // Keep ref in sync so drag handlers always read the latest positions
  const setWinStates = useCallback((updater: (prev: WinState[]) => WinState[]) => {
    _setWinStates(prev => {
      const next = updater(prev);
      winStatesRef.current = next;
      return next;
    });
  }, []);

  const [windowScale, setWindowScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const el = desktopRef.current;

      if (!el) return;

      const { width, height } = el.getBoundingClientRect();

      const padding = 20;

      // Taille minimale nécessaire pour la plus grosse fenêtre
      const maxWindowWidth = Math.max(
        ...WINDOW_DEFS.map((window) => window.width)
      );

      const maxWindowHeight = Math.max(
        ...WINDOW_DEFS.map((window) => window.height)
      );

      const widthScale =
        (width - padding * 2) / maxWindowWidth;

      const heightScale =
        (height - 50) / maxWindowHeight;

      const scale = Math.min(
        1,
        widthScale,
        heightScale
      );

      setWindowScale(Math.max(0.55, scale));
    };

    updateScale();

    const observer = new ResizeObserver(updateScale);
    observer.observe(desktopRef.current!);

    return () => observer.disconnect();
  }, []);

  useEffect(() => { winStatesRef.current = winStates; }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Clock
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const fmt = new Intl.DateTimeFormat('fr-FR', {
        weekday: 'long', day: 'numeric', month: 'short',
        hour: '2-digit', minute: '2-digit',
      });
      setDateTimeStr(fmt.format(now).replace(/^\w/, c => c.toUpperCase()));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  // Place windows at random positions once layout is known
  useEffect(() => {
    const place = () => {
      const el = desktopRef.current;

      if (!el) return;

      const { width, height } = el.getBoundingClientRect();

      const TOP_BAR = 30;
      const PADDING = 10;

      setWinStates((prev) =>
        prev.map((ws) => {
          const def = WINDOW_DEFS.find(
            (d) => d.id === ws.id
          )!;

          // Dimensions réellement affichées
          const scaledWidth = def.width * windowScale;
          const scaledHeight = def.height * windowScale;

          const maxX = Math.max(
            PADDING,
            width - scaledWidth - PADDING
          );

          const maxY = Math.max(
            TOP_BAR + PADDING,
            height - scaledHeight - PADDING
          );

          return {
            ...ws,

            x:
              PADDING +
              Math.random() *
                Math.max(0, maxX - PADDING),

            y:
              TOP_BAR +
              PADDING +
              Math.random() *
                Math.max(
                  0,
                  maxY - TOP_BAR - PADDING
                ),
          };
        })
      );
    };

    const timer = setTimeout(place, 150);

    return () => clearTimeout(timer);
  }, [windowScale]);

  // Staggered appearance
  useEffect(() => {
    const timers = WINDOW_DEFS.map(def =>
      setTimeout(() => {
        setWinStates(prev => prev.map(ws => ws.id === def.id ? { ...ws, visible: true } : ws));
      }, def.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Bring clicked window to front
  const handleWindowMouseDown = useCallback((id: string) => {
    maxZRef.current += 1;
    const z = maxZRef.current;
    setWinStates(prev => prev.map(ws => ws.id === id ? { ...ws, zIndex: z } : ws));
  }, [setWinStates]);

  // Start dragging on title bar click
  const handleTitleMouseDown = useCallback((e: React.MouseEvent, id: string) => {
    e.preventDefault();
    maxZRef.current += 1;
    const z = maxZRef.current;
    setWinStates(prev => prev.map(ws => ws.id === id ? { ...ws, zIndex: z } : ws));
    const ws = winStatesRef.current.find(w => w.id === id);
    if (!ws) return;
    dragRef.current = {
      id,
      startMouseX: e.clientX, startMouseY: e.clientY,
      startWinX: ws.x,        startWinY: ws.y,
    };
  }, [setWinStates]);

  // Global mouse move/up for drag
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const drag = dragRef.current;

      if (!drag) return;

      const el = desktopRef.current;

      if (!el) return;

      const { width, height } =
        el.getBoundingClientRect();

      const def = WINDOW_DEFS.find(
        (d) => d.id === drag.id
      )!;

      // Le déplacement de la souris doit être
      // ramené à l'échelle réelle de la fenêtre.
      const deltaX =
        (e.clientX - drag.startMouseX) / windowScale;

      const deltaY =
        (e.clientY - drag.startMouseY) / windowScale;

      const scaledWidth =
        def.width * windowScale;

      const scaledHeight =
        def.height * windowScale;

      const newX = Math.max(
        0,
        Math.min(
          width - scaledWidth,
          drag.startWinX + deltaX
        )
      );

      const newY = Math.max(
        30,
        Math.min(
          height - scaledHeight,
          drag.startWinY + deltaY
        )
      );

      setWinStates((prev) =>
        prev.map((ws) =>
          ws.id === drag.id
            ? {
                ...ws,
                x: newX,
                y: newY,
              }
            : ws
        )
      );
    };
    const onUp = () => { dragRef.current = null; };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
  }, [setWinStates]);

  return (
    <section className="relative min-h-[calc(100vh-6rem)] flex flex-col items-center justify-center px-6 text-center overflow-hidden">

      {/* Desktop mockup */}
      <div
        ref={desktopRef}
        className="absolute overflow-hidden rounded-2xl w-[94%] h-[68%] sm:w-[88%] sm:h-[72%] md:w-[84%] md:h-[78%] lg:w-[80%] lg:h-[85%] -translate-y-6 sm:-translate-y-8 lg:-translate-y-[50px]"
        style={{
          aspectRatio: "16 / 10",
          background: "linear-gradient(145deg, #060e1f 0%, #0b1a38 35%, #071428 65%, #040c1c 100%)",
          boxShadow: "0 0 0 1px #1d3050, 0 40px 100px rgba(0,0,0,0.7), 0 0 60px rgba(59,130,246,0.12)",
        }}
      >
        {/* Wallpaper blobs */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: "55%", height: "55%",
            top: "-5%", left: "-5%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59,130,246,0.14) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            width: "45%", height: "45%",
            bottom: "-10%", right: "-5%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(56,189,248,0.1) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            width: "30%", height: "30%",
            top: "40%", left: "55%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)",
            filter: "blur(35px)",
          }}
        />

        {/* Subtle dot grid wallpaper overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.07]"
          style={{
            backgroundImage: "radial-gradient(circle, #93c5fd 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* GNOME-style top bar */}
        <div
          className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 z-20"
          style={{
            height: "30px",
            background: "rgba(6,14,31,0.88)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(29,48,80,0.5)",
          }}
        >
          <span style={{ color: "#94a3b8", fontSize: "11px", letterSpacing: "0.03em" }}>Activities</span>
          <span style={{ color: "#cbd5e1", fontSize: "11px" }}>{dateTimeStr}</span>
          <div className="flex items-center gap-2">
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" style={{ opacity: 0.7 }}>
              <path d="M7 3C8.9 3 10.6 3.7 11.9 4.9L13 3.7C11.4 2.3 9.3 1.5 7 1.5S2.6 2.3 1 3.7L2.1 4.9C3.4 3.7 5.1 3 7 3Z" fill="#94a3b8"/>
              <path d="M7 6C8 6 8.9 6.4 9.6 7L10.7 5.8C9.7 4.9 8.4 4.4 7 4.4S4.3 4.9 3.3 5.8L4.4 7C5.1 6.4 6 6 7 6Z" fill="#94a3b8"/>
              <circle cx="7" cy="9" r="1" fill="#94a3b8"/>
            </svg>
            <div className="flex items-center gap-[2px]">
              {[1,2,3,4].map(i => (
                <div key={i} style={{ width: "3px", height: `${4 + i * 2}px`, background: "#3b82f6", borderRadius: "1px", opacity: i <= 3 ? 1 : 0.3 }} />
              ))}
            </div>
          </div>
        </div>

        {/* Watermark logo */}
        <div
          className="absolute z-10 flex flex-col items-center gap-2"
          style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        >
          <div style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            <div
              className="absolute"
              style={{
                width: "100px", height: "100px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(59,130,246,0.35) 0%, rgba(56,189,248,0.1) 50%, transparent 75%)",
                filter: "blur(8px)",
              }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/favicon.ico"
              alt="KJ"
              style={{
                width: "64px", height: "64px", position: "relative",
                filter: "drop-shadow(0 0 12px rgba(59,130,246,0.9)) drop-shadow(0 0 28px rgba(56,189,248,0.5)) brightness(1.15) saturate(1.4)",
              }}
            />
          </div>
        </div>

        {/* Floating windows */}
        {winStates.map(ws => {
          const def     = WINDOW_DEFS.find(d => d.id === ws.id)!;
          const Content = WINDOW_CONTENTS[ws.id];
          return (
            <WindowFrame
              key={ws.id}
              id={ws.id}
              title={def.title}
              x={ws.x} y={ws.y}
              zIndex={ws.zIndex}
              visible={ws.visible}
              width={def.width}
              height={def.height}
              onTitleMouseDown={handleTitleMouseDown}
              onWindowMouseDown={handleWindowMouseDown}
              scale={windowScale}
            >
              <Content />
            </WindowFrame>
          );
        })}

      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted">
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase opacity-60">Scroll</span>
        <div className="h-8 w-px animate-bounce bg-gradient-to-b from-muted/60 to-transparent" />
      </div>
    </section>
  );
}
