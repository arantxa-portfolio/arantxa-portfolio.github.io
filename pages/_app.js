import { Layout } from "@/components/Layout";
import "@/styles/globals.scss";
import Head from "next/head";
import I18nProvider from 'next-translate/I18nProvider'
import { i18nConfig } from "@/i18n";
import commonPt from "../locales/pt/common.json";
import commonEn from "../locales/en/common.json";
import commonEs from "../locales/es/common.json";
import { LanguageWrapper } from "@/wrappers/LanguageWrapper";

export default function App({ Component, pageProps, router }) {
  const lang = i18nConfig.locales.includes(router.query.locale)
    ? String(router.query.locale)
    : i18nConfig.defaultLocale;
    
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
          <title>arantia</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
     </LanguageWrapper>
    </I18nProvider>
  );
}
