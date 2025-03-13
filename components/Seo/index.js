import { useI18n } from "@/hooks/useI18n";
import Head from "next/head";

export default function Seo({
  title = "Arântia",
  description,
  image = "https://arantia.art/banner.png",
}) {
  const { t, lang } = useI18n({});

  return (
    <Head>
      <title>{title}</title>
      <meta name="keywords" content={t("keywords")} />
      <meta name="author" content="Arântia" />
      <meta name="description" content={description || t("description")}/>
      <meta property="og:title" content={title} />
      <meta
        property="og:description"
        content={description || t("description")}
      />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={lang} />
      <meta property="og:site_name" content="Arântia" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:description"
        content={description || t("description")}
      />
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
    </Head>
  );
}

Seo.defaultProps = {
  title: "Arântia",
  description: "Meu portfólio",
  keywords: "arte, ilustração, roteiro",
  image: "/me.png",
};
