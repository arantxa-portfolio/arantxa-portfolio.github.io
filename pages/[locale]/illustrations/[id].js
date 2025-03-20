import ImageModal from "@/components/ImageModal";
import { Link } from "@/components/Link";
import PinterestButton from "@/components/PinterestButton";
import Seo from "@/components/Seo";
import TimeAgo from "@/components/TimeAgo";
import { useI18n } from "@/hooks/useI18n";
import illustrations from "@/lib/illustrations-data.json";
import { useState } from "react";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://arantia.art"
    : "http://localhost:3000";

export async function getStaticPaths() {
  const locales = ["en", "pt", "es"];
  const paths = locales.flatMap((locale) =>
    illustrations.map((il) => ({
      params: { locale, id: il.id },
    }))
  );

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { id } }) {
  const item = illustrations.find((il) => il.id === id);

  if (item) {
    return { props: { item } };
  } else {
    return { notFound: true };
  }
}

export default function IllustrationDetail({ item }) {
  const { t, lang } = useI18n({});
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <ImageModal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <img src={item.src} />
      </ImageModal>
      <Seo
        title={`${item.title[lang]} | ${t("illustrations_bar")}`}
        description={item.description[lang]}
        image={`${baseUrl}${item.src}`}
      />
      <section className="media-container">
        <div className="media-image">
          <img src={item.src} onClick={() => setOpenModal(true)} />
          <div className="container-center" style={{ gap: "12px" }}>
            <PinterestButton baseUrl={baseUrl} item={item} />
          </div>
        </div>
        <div className="media-detail">
          <div>
            <Link href="/">
              <i className="bi bi-arrow-left-circle"></i> {t("back")}
            </Link>
            <h2 className="text-thicker">{item.title[lang]}</h2>
            <p className="text-thinner">{item.description[lang]}</p>
            <TimeAgo date={item.date} />
          </div>
        </div>
      </section>
    </>
  );
}
