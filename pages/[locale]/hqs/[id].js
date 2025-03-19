import { Link } from "@/components/Link";
import hqs from "@/lib/hqs-data.json";
import { useI18n } from "@/hooks/useI18n";
import Seo from "@/components/Seo";
import ImageModal from "@/components/ImageModal";
import { useState } from "react";
import PinterestButton from "@/components/PinterestButton";
import TimeAgo from "@/components/TimeAgo";
import HQControl from "@/components/HQControl";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://arantia.art"
    : "http://localhost:3000";

export async function getStaticPaths() {
  const locales = ["en", "pt", "es"];
  const paths = locales.flatMap((locale) =>
    hqs.map((hq) => ({
      params: { locale, id: hq.id },
    }))
  );

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { id } }) {
  const item = hqs.find((hq) => hq.id === id);

  if (item) {
    return { props: { item } };
  } else {
    return { notFound: true };
  }
}

export default function HQDetail({ item }) {
  const { t, lang } = useI18n({});
  const [openModal, setOpenModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  return (
    <>
      <ImageModal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <img src={item.src[selectedImageIndex]} />
        <HQControl
          total={item.src.length}
          current={selectedImageIndex}
          onPrevious={() => setSelectedImageIndex(selectedImageIndex - 1)}
          onNext={() => setSelectedImageIndex(selectedImageIndex + 1)}
        />
      </ImageModal>
      <Seo
        title={`${item.title[lang]} | ${t("hqs_bar")}`}
        description={item.description[lang]}
        image={`${baseUrl}${item.src[0]}`}
      />
      <section className="media-container">
        <div className="media-image">
          {item.src.map((i, idx) => (
            <img
              key={idx}
              src={i}
              alt={`Page ${idx + 1}`}
              onClick={() => {
                setSelectedImageIndex(idx);
                setOpenModal(true);
              }}
            />
          ))}
          <div className="container-center" style={{ gap: "12px" }}>
            <PinterestButton baseUrl={baseUrl} item={item} isHQ />
          </div>
        </div>
        <div className="media-detail">
          <div>
            <Link href="/hqs">
              <i className="bi bi-arrow-left-circle"></i> {t("back")}
            </Link>
            <h3 className="text-thicker">{item.title[lang]}</h3>
            <p className="text-thinner">{item.description[lang]}</p>
            <TimeAgo date={item.date} />
            <hr />
            <small>
              <b>{`${t("credits")}: `}</b>
              <span className="text-thinner">{item.credits[lang]}</span>
            </small>
          </div>
        </div>
      </section>
    </>
  );
}
