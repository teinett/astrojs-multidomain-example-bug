// @ts-check
import { defineConfig } from "astro/config";
import node from "@astrojs/node";

export default defineConfig({
    site: "http://www.example.local",
    output: "server",
    adapter: node({ mode: "standalone" }),
    trailingSlash: "never",
    i18n: {
        locales: ["en", "pt"],
        defaultLocale: "en",
        routing: { prefixDefaultLocale: false },
        domains: {
            en: "http://www.example.local",
            pt: "http://pt.example.local",
        },
    },
    server: { allowedHosts: ["www.example.local", "pt.example.local"] },
});
