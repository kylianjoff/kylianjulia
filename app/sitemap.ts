import type { MetadataRoute } from "next";

export const dynamic = "force-static";
const siteUrl = "https://kylianjulia.fr";

export default function sitemap(): MetadataRoute.Sitemap {
    const routes = ["", "/about", "/blog", "/cheatsheets"];

    return routes.map(route => ({
        url: `${siteUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "/blog" ? "daily" : "monthly",
        priority: route === "" ? 1 : 0.7,
    }));
}
