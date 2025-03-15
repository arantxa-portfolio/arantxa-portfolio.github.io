import { useI18n } from "@/hooks/useI18n";
import { languageDetector } from "@/lib/languageDetector";
import { useRouter } from "next/router";
import { useState } from "react";

export const LanguageSwitcher = () => {
  const { lang } = useI18n({});
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const LANGUAGES = ["pt", "en", "es"];

  const changeLanguage = (newLang) => {
    if (newLang === lang) return;
    if(languageDetector.cache) {
      languageDetector.cache(newLang)
    }
    const newPath = `/${newLang}${router.asPath.replace(`/${lang}`, "")}`;
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: "8px 12px",
          background: "$primary-white",
          color: "$primary-red",
          border: "none",
          cursor: "pointer",
          borderRadius: "4px",
          width: "60px",
          fontSize: "14px"
        }}
      >
        {lang.toUpperCase()}{" "}
        {isOpen ? (
          <i className="bi bi-chevron-up" />
        ) : (
          <i className="bi bi-chevron-down" />
        )}
      </button>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            background: "white",
            border: "1px solid #ddd",
            boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
            borderRadius: "4px",
            padding: "8px 12px",
            zIndex: 1000,
          }}
        >
          {LANGUAGES.map((l) => (
            <button
              key={l}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                padding: "8px",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                fontSize: "14px",
              }}
              onClick={() => changeLanguage(l)}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
