import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Blog — Kylian JULIA";

export default function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    padding: "80px",
                    background: "#0b1120",
                    backgroundImage:
                        "radial-gradient(circle at 85% 20%, rgba(56,189,248,0.35), transparent 55%), radial-gradient(circle at 10% 90%, rgba(59,130,246,0.35), transparent 55%)",
                    fontFamily: "sans-serif",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                        marginBottom: 40,
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 64,
                            height: 64,
                            borderRadius: 20,
                            background: "linear-gradient(135deg, #3b82f6, #38bdf8)",
                            color: "#ffffff",
                            fontSize: 28,
                            fontWeight: 700,
                        }}
                    >
                        KJ
                    </div>
                    <div style={{ display: "flex", color: "#94a3b8", fontSize: 26, letterSpacing: 2 }}>
                        KYLIANJULIA.FR
                    </div>
                </div>

                <div
                    style={{
                        display: "flex",
                        color: "#ffffff",
                        fontSize: 76,
                        fontWeight: 700,
                    }}
                >
                    Blog
                </div>

                <div
                    style={{
                        display: "flex",
                        color: "#38bdf8",
                        fontSize: 34,
                        fontWeight: 600,
                        marginTop: 20,
                        maxWidth: 900,
                    }}
                >
                    Blog
                </div>
            </div>
        ),
        { ...size }
    );
}
