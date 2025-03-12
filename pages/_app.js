import { Layout } from "@/components/Layout";
import "@/styles/globals.scss";
import Head from "next/head";
import I18nProvider from 'next-translate/I18nProvider'
import { i18nConfig } from "@/i18n";
import commonPt from "../locales/pt/common.json";
import commonEn from "../locales/en/common.json";
import commonEs from "../locales/es/common.json";
import { LanguageWrapper } from "@/wrappers/LanguageWrapper";
import { useEffect } from "react";

export default function App({ Component, pageProps, router }) {
  const lang = i18nConfig.locales.includes(router.query.locale)
    ? String(router.query.locale)
    : i18nConfig.defaultLocale;

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang)
  }, [lang])
    
  return (
    <I18nProvider
      lang={lang}
      namespaces={{
        common: lang === "es" ? commonEs : lang === "en" ? commonEn : commonPt,
      }}
    >
     <LanguageWrapper>
     <Layout>
        <Head>
          <title>Arântia</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/site.webmanifest" />
        </Head>
        <Component {...pageProps} />
      </Layout>
     </LanguageWrapper>
    </I18nProvider>
  );
}
