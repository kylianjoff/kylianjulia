import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/blog-source";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);
    const title = post?.title ?? "Article";
    const tags = post?.tags.slice(0, 3) ?? [];
    const meta = [post?.author, post?.date].filter(Boolean).join(" · ");

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "70px",
                    background: "#0b1120",
                    backgroundImage:
                        "radial-gradient(circle at 85% 15%, rgba(56,189,248,0.35), transparent 55%), radial-gradient(circle at 5% 95%, rgba(59,130,246,0.35), transparent 55%)",
                    fontFamily: "sans-serif",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 56,
                            height: 56,
                            borderRadius: 18,
                            background: "linear-gradient(135deg, #3b82f6, #38bdf8)",
                            color: "#ffffff",
                            fontSize: 24,
                            fontWeight: 700,
                        }}
                    >
                        KJ
                    </div>
                    <div style={{ display: "flex", color: "#94a3b8", fontSize: 22, letterSpacing: 2 }}>
                        KYLIANJULIA.FR — BLOG
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    {tags.length > 0 && (
                        <div style={{ display: "flex", gap: 10 }}>
                            {tags.map(tag => (
                                <div
                                    key={tag}
                                    style={{
                                        display: "flex",
                                        padding: "6px 16px",
                                        borderRadius: 999,
                                        border: "1px solid rgba(59,130,246,0.4)",
                                        background: "rgba(59,130,246,0.08)",
                                        color: "#38bdf8",
                                        fontSize: 22,
                                    }}
                                >
                                    {tag}
                                </div>
                            ))}
                        </div>
                    )}

                    <div
                        style={{
                            display: "flex",
                            color: "#ffffff",
                            fontSize: 58,
                            fontWeight: 700,
                            lineHeight: 1.15,
                            maxWidth: 1000,
                        }}
                    >
                        {title}
                    </div>

                    {meta && (
                        <div style={{ display: "flex", color: "#64748b", fontSize: 26 }}>{meta}</div>
                    )}
                </div>
            </div>
        ),
        { ...size }
    );
}
