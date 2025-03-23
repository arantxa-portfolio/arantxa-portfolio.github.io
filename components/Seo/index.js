import { useI18n } from "@/hooks/useI18n";
import Head from "next/head";
import { useRouter } from "next/router";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://arantia.art"
    : "http://localhost:3000";

export default function Seo({
  title = "Arântia",
  description,
  image = "https://arantia.art/banner-main.png",
}) {
  const { t, lang } = useI18n({});
  const router = useRouter();
  const canonicalUrl = `${baseUrl}${router.asPath}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="keywords" content={t("keywords")} />
      <meta name="author" content="Arântia" />
      <meta name="description" content={description || t("description")} />
      <meta property="og:title" content={title} />
      <meta
        property="og:description"
        content={description || t("description")}
      />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={lang} />
      <meta property="og:url" content={canonicalUrl}/>
      <meta property="og:site_name" content="Arântia" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:description"
        content={description || t("description")}
      />
      <meta name="twitter:card" content="summary_large_image"/>
      <link
        rel="icon"
        type="image/png"
        href="/favicon-96x96.png"
        sizes="96x96"
      />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="canonical" href={canonicalUrl} />
      {["pt", "en", "es"].map((l) => (
        <link
          key={l}
          rel="alternate"
          href={`${baseUrl}/${l}${router.asPath.replace(/^\/[a-z]{2}/, "")}`}
          hrefLang={l}
        />
      ))}
      <link
        rel="alternate"
        href={`${baseUrl}/pt${router.asPath.replace(/^\/[a-z]{2}/, "")}`}
        hrefLang="x-default"
      />
    </Head>
  );
}

Seo.defaultProps = {
  title: "Arântia",
  description: "Meu portfólio",
  keywords: "arte, ilustração, roteiro",
  image: "/me.png",
};
