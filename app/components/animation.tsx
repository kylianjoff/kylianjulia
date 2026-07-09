export default function AnimationSection() {
  return (
    <section className="relative min-h-[calc(100vh-6rem)] flex flex-col items-center justify-center px-6 text-center overflow-hidden">

      {/* Desktop mockup */}
      <div
        className="w-[80%] h-[85%] absolute rounded-2xl overflow-hidden translate-y-[-50px]"
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
          <span style={{ color: "#cbd5e1", fontSize: "11px" }}>Mardi 8 Juil. 20:42</span>
          <div className="flex items-center gap-2">
            {/* Wifi + battery mock icons */}
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

        {/* Centered favicon with glow — watermark-style wallpaper logo */}
        <div
          className="absolute z-10 flex flex-col items-center gap-2"
          style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        >
          {/* Outer glow ring */}
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
                width: "64px",
                height: "64px",
                position: "relative",
                filter:
                  "drop-shadow(0 0 12px rgba(59,130,246,0.9)) drop-shadow(0 0 28px rgba(56,189,248,0.5)) brightness(1.15) saturate(1.4)",
              }}
            />
          </div>
        </div>

      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted">
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase opacity-60">Scroll</span>
        <div className="h-8 w-px animate-bounce bg-gradient-to-b from-muted/60 to-transparent" />
      </div>
    </section>
  );
}
