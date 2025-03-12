import { Link } from "@/components/Link";
import { useI18n } from "@/hooks/useI18n";
import { getIllustrations } from "@/lib/getIllustrations";
import Image from "next/image";
// import { useEffect, useState } from "react";
import illustrations from "@/lib/illustrations-data.json";

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
  // const [illustrations, setIllustrations] = useState([]);

  // useEffect(() => {
  //   getIllustrations().then((data) => setIllustrations(data));
  // }, []);
  // console.log(illustrations);

  return (
    <>
      <div className="banner" />
      <section className="section-illustrations">
        <section className="section-content">
          <h2>{t("illustrations")}</h2>
          <div className="section-gallery">
            {illustrations.map((il, idx) => (
              <Link href={`/illustrations/` + (idx + 1)}>
                <Image
                  key={idx}
                  src={il.src}
                  width={360}
                  height={360}
                  title={il.title[lang]}
                />
              </Link>
            ))}
          </div>
        </section>
      </section>
    </>
  );
}
