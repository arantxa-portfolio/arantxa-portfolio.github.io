import AboutBanner from "@/components/AboutBanner";
import Seo from "@/components/Seo";
import { useI18n } from "@/hooks/useI18n";

export default function Sobre() {
  const { t } = useI18n({});

  return (
    <>
      <Seo title={t("about_bar")} />
      <section className="about-section mt-xl mb-xs">
        <div className="avatar"></div>
        <section className="about-content">
          <h2>Arântia</h2>
          <p className="text-thinner">{t("about_title")}</p>
        </section>
        <hr />
        <section className="about-content">
          <p>
            {t("about_text")}
          </p>
        </section>
      </section>
      <AboutBanner />
    </>
  );
}
