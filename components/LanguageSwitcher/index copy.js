import { languageDetector } from "@/lib/languageDetector";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./LanguageSwitcher.module.scss";

export const LanguageSwitcher = ({ locale, ...rest }) => {
  const router = useRouter();

  let href = rest.href || router.asPath;
  let pName = router.pathname;
  Object.keys(router.query).forEach((k) => {
    if (k === "locale") {
      pName = pName.replace(`[${k}]`, locale);
      return;
    }
    pName = pName.replace(`[${k}]`, String(router.query[k]));
  });
  if (locale) {
    href = rest.href ? `/${locale}${rest.href}` : pName;
  }

  return (
    <Link
      href={href}
      onClick={() =>
        languageDetector.cache ? languageDetector.cache(locale) : {}
      }
    >
      <button style={{ fontSize: "small" }}>{locale}</button>
    </Link>
  );
};
