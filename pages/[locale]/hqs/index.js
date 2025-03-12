import { Link } from "@/components/Link";
import { useI18n } from "@/hooks/useI18n";
import hqs from "@/lib/hqs-data.json";
import Image from "next/image";

export function getStaticPaths() {
  return {
    paths: [
      { params: { locale: "pt" } },
      { params: { locale: "en" } },
      { params: { locale: "es" } },
    ].map(({ params }) => ({
      params: { locale: params.locale },
    })),
    fallback: false,
  };
}

export async function getStaticProps() {
  return {
    props: {
      hqs,
    },
  };
}

export default function HQs({ hqs }) {
  const { t, lang } = useI18n({});

  return (
    <>
      <div className="banner" />
      <section className="section-hqs">
        <section className="section-content">
          <h2>{t("hqs")}</h2>
          <div className="section-gallery">
            {hqs.map((hq, idx) => (
              <Link key={idx} href={`/hqs/` + (idx + 1)}>
                <Image
                  key={idx}
                  src={hq.src[0]}
                  width={360}
                  height={360}
                  title={hq.title[lang]}
                  alt={hq.description[lang]}
                />
              </Link>
            ))}
          </div>
        </section>
      </section>
    </>
  );
}
