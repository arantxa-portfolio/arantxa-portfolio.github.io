import { Link } from "@/components/Link";
import { useI18n } from "@/hooks/useI18n";
import Image from "next/image";
import illustrations from "@/lib/illustrations-data.json";
import Seo from "@/components/Seo";
import { motion } from "framer-motion";

export function getStaticPaths() {
  return { paths: ["/pt", "/en", "/es"], fallback: false };
}

export async function getStaticProps() {
  illustrations.sort((a, b) => new Date(b.date) - new Date(a.date));
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
      <Seo title={t("illustrations_bar")} />
      <div className="banner-wrapper">
        <div className="banner" />
      </div>
      <section className="section-illustrations">
        <section className="section-content">
          <h2>{t("illustrations")}</h2>
          <div className="section-gallery">
            {illustrations.map((il, idx) => (
              <Link key={il.id} href={`/illustrations/` + il.id}>
                <motion.div
                  className="gallery-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <Image
                    src={il.src}
                    width={360}
                    height={360}
                    title={il.title[lang]}
                    alt={il.description[lang]}
                    unoptimized
                  />
                  <h6>{il.title[lang]}</h6>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>
      </section>
    </>
  );
}
