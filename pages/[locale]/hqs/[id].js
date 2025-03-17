import { Link } from "@/components/Link";
import hqs from "@/lib/hqs-data.json";
import { useI18n } from "@/hooks/useI18n";
import Seo from "@/components/Seo";
import ImageModal from "@/components/ImageModal";
import { useState } from "react";

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
  const shareUrl = `${baseUrl}/hqs/${item.id}`;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(item.title[lang]);
  return (
    <>
      <ImageModal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <img src={item.src[selectedImageIndex]} />
        <div className="hq-control">
          <button title={t('back')} onClick={() => setSelectedImageIndex(selectedImageIndex - 1)} disabled={selectedImageIndex === 0}>
            <i className="bi bi-arrow-left-circle-fill"></i>
          </button>
          <span className="pages text-thinner">{selectedImageIndex+1} / {item.src.length}</span>
          <button title={t('next')} onClick={() => setSelectedImageIndex(selectedImageIndex + 1)} disabled={selectedImageIndex === item.src.length - 1}>
          <i className="bi bi-arrow-right-circle-fill"></i>
          </button>
        </div>
      </ImageModal>
      <Seo
        title={`${item.title[lang]} | ${t("hqs_bar")}`}
        description={item.description[lang]}
        image={`${baseUrl}${item.src[0]}`}
      />
      <section className="hq-container">
        <div className="hq-image">
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
          <div className="container-center" style={{gap: "12px"}}>
            <a
              href={`https://www.pinterest.com/pin/create/button/?url=${encodedUrl}&media=${encodeURIComponent(item.src[0])}&description=${encodedText}`}
              target="_blank"
            >
              <i class="bi bi-pinterest"></i> <small className="ml-xs">{t('save')}</small>
            </a>
          </div>
        </div>
        <div className="hq-detail">
          <div>
            <Link href="/hqs">
              <i className="bi bi-arrow-left-circle"></i> {t("back")}
            </Link>
            <h3 className="text-thicker">{item.title[lang]}</h3>
            <p className="text-thinner">{item.description[lang]}</p>
            <hr/>
            <small><b>{`${t('credits')}: `}</b><span className="text-thinner">{item.credits[lang]}</span></small>
          </div>
        </div>
      </section>
    </>
  );
}
