import { Link } from "@/components/Link";
import { useI18n } from "@/hooks/useI18n";
import Image from "next/image";
import illustrations from "@/lib/illustrations-data.json";
import Seo from "@/components/Seo";

export function getStaticPaths() {
  return { paths: ["/pt", "/en", "/es"], fallback: false };
}

export async function getStaticProps() {
  return {
    props: {
      illustrations,
    },
  };
}

export default function Home({ illustrations }) {
  const { t, lang } = useI18n({});

  return (
    <>
      <Seo title={t('illustrations_bar')} />
      <div className="banner" />
      <section className="section-illustrations">
        <section className="section-content">
          <h2>{t("illustrations")}</h2>
          <div className="section-gallery">
            {illustrations.map((il, idx) => (
              <Link key={idx} href={`/illustrations/` + (idx + 1)}>
                <Image
                  key={idx}
                  src={il.src}
                  width={360}
                  height={360}
                  title={il.title[lang]}
                  alt={il.description[lang]}
                  unoptimized
                />
              </Link>
            ))}
          </div>
        </section>
      </section>
    </>
  );
}
