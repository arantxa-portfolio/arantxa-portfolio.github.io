const fs = require("fs");
const globby = require("globby");

function getAlternates(siteUrl, route, lang) {
  let alternates = "";

  if (lang === "en") {
    alternates = `<xhtml:link rel="alternate" hreflang="pt" href="${siteUrl.replace(
      "en",
      "pt"
    )}${route}"/>
          <xhtml:link rel="alternate" hreflang="es" href="${siteUrl.replace(
            "en",
            "es"
          )}${route}"/>`;
  } else if (lang === "es") {
    alternates = `<xhtml:link rel="alternate" hreflang="pt" href="${siteUrl.replace(
      "es",
      "pt"
    )}${route}"/>
<xhtml:link rel="alternate" hreflang="en" href="${siteUrl.replace(
      "es",
      "en"
    )}${route}"/>`;
  } else {
    alternates = `<xhtml:link rel="alternate" hreflang="en" href="${siteUrl.replace(
      "pt",
      "en"
    )}${route}"/>
<xhtml:link rel="alternate" hreflang="es" href="${siteUrl.replace(
      "pt",
      "es"
    )}${route}"/>`;
  }

  return alternates;
}

function getPriority(route) {
  if (route === "/") {
    return 1.0;
  } else if (route.endsWith("/hqs")) {
    return 0.9;
  } else if (route.startsWith("/hqs") || route.startsWith("/illustrations")) {
    return 0.8;
  } else {
    return 0.6;
  }
}

function getFreq(route) {
  if (route === "/") {
    return "monthly";
  } else if (route.endsWith("/hqs")) {
    return "monthly";
  } else if (route.startsWith("/hqs/") || route.startsWith("/illustrations/")) {
    return "monthly";
  } else {
    return "yearly";
  }
}
async function generateIndex() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap>
        <loc>https://arantia.art/sitemap-pt.xml</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
    </sitemap>
    <sitemap>
        <loc>https://arantia.art/sitemap-en.xml</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
    </sitemap>
    <sitemap>
        <loc>https://arantia.art/sitemap-es.xml</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
    </sitemap>
</sitemapindex>
`;

  fs.writeFileSync(`out/sitemap-index.xml`, sitemap);
}
async function generate() {
  await generateIndex();
  ["pt", "en", "es"].forEach(async (lang) => {
    const pages = await globby([
      `.next/server/pages/${lang}/**/*.html`,
      `.next/server/pages/[locale]/about.html`,
      `!.next/server/pages/${lang}/404.html`,
      `!.next/server/pages/${lang}/500.html`,
    ]);

    const siteUrl =
      lang === "pt"
        ? "https://arantia.art/pt"
        : lang === "es"
        ? "https://arantia.art/es"
        : "https://arantia.art/en";

    const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
        <url>
            <loc>${siteUrl}</loc>            
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
        </url>
        ${pages
          .map((page) => {
            const route = page
              .replace(`.next/server/pages/${lang}`, "")
              .replace(".html", "")
              .replace(".next/server/pages/[locale]", "");

            const alternates = getAlternates(siteUrl, route, lang);
            const priority = getPriority(route);
            const freq = getFreq(route);

            return `<url>
                  <loc>${siteUrl}${route}</loc>
                  <lastmod>${new Date().toISOString()}</lastmod>     
                  <changefreq>${freq}</changefreq>             
                  <priority>${priority}</priority>
                  <xhtml:link rel="alternate" hreflang="${lang}" href="${siteUrl}${route}"/>
                  ${alternates}
              </url>
            `;
          })
          .join("")}
    </urlset>
    `;

    fs.writeFileSync(`out/sitemap-${lang}.xml`, sitemap);
  });
  console.log("SITEMAP GENERATED");
}

generate();
