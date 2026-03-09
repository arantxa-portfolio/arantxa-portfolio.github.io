import AboutBanner from "@/components/AboutBanner";
import Seo from "@/components/Seo";
import { useI18n } from "@/hooks/useI18n";
import aboutData from "@/lib/about-data.json";

export function getStaticPaths() {
  return {
    paths: [
      { params: { locale: "pt" } },
      { params: { locale: "en" } },
      { params: { locale: "es" } },
    ],
    fallback: false,
  };
}

export async function getStaticProps() {
  return {
    props: {
      aboutData,
    },
  };
}

export default function Sobre({ aboutData }) {
  const { t, lang } = useI18n({});

  const content = {
    title: aboutData.title[lang] || aboutData.title["pt"],
    text: aboutData.text[lang] || aboutData.text["pt"],
  };

  return (
    <>
      <Seo title={t("about_bar")} />
      <section className="about-section mt-xl mb-xl">
        <div
          className="avatar"
          style={{ backgroundImage: `url(${aboutData.avatar})` }}
        ></div>
        <section className="about-content">
          <h2>{aboutData.name}</h2>
          <p className="text-thinner">{content.title}</p>
        </section>
        <hr />
        <section className="about-content">
          <p>{content.text}</p>
        </section>
      </section>
      <AboutBanner />
    </>
  );
}
