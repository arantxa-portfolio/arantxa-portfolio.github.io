import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { languageDetector } from "@/lib/languageDetector";
import { i18nConfig } from "../i18n";


export const LanguageWrapper = ({ children }) => {
  const router = useRouter();
  const detectedLng = languageDetector.detect();

  useEffect(() => {
    const {
      query: { locale },
      asPath,
      isReady,
    } = router;

    // Check if the current route has accurate locale
    if (isReady && !i18nConfig.locales.includes(String(locale))) {
      if (asPath.startsWith("/" + detectedLng) && router.route === "/404") {
        return;
      }

      if (detectedLng && languageDetector.cache) {
        languageDetector.cache(detectedLng);
      }
      router.replace("/" + detectedLng + asPath);
    }
  }, [router, detectedLng]);

  return (router.query.locale &&
    i18nConfig.locales.includes(String(router.query.locale))) ||
    router.asPath.includes(detectedLng ?? i18nConfig.defaultLocale) ? (
    <>{children}</>
  ) : (
    <p>Loading...</p>
  );
};