import ImageModal from "@/components/ImageModal";
import { Link } from "@/components/Link";
import Seo from "@/components/Seo";
import { useI18n } from "@/hooks/useI18n";
import illustrations from "@/lib/illustrations-data.json";
import { formatDistanceToNow } from "date-fns";
import { ptBR, es, enUS } from "date-fns/locale";
import { useState } from "react";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://arantia.art"
    : "http://localhost:3000";

function getDateLocale(currentLang) {
  if (currentLang === "es") {
    return es;
  } else if (currentLang === "en") {
    return enUS;
  } else {
    return ptBR;
  }
}

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
  const shareUrl = `${baseUrl}/illustrations/${item.id}`;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(item.title[lang]);
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
      <section className="illustration-container">
        <div className="illustration-image">
          <img src={item.src} onClick={() => setOpenModal(true)} />
          <div className="container-center" style={{gap: "12px"}}>
            <a
              href={`https://www.pinterest.com/pin/create/button/?url=${encodedUrl}&media=${encodeURIComponent(item.src)}&description=${encodedText}`}
              target="_blank"
            >
              <i class="bi bi-pinterest"></i> <small className="ml-xs">{t('save')}</small>
            </a>
          </div>
        </div>
        <div className="illustration-detail">
          <div>
            <Link href="/">
              <i className="bi bi-arrow-left-circle"></i> {t("back")}
            </Link>
            <h3 className="text-thicker">{item.title[lang]}</h3>
            <p className="text-thinner">{item.description[lang]}</p>
            <p className="time mt-md">
              <i className="bi bi-clock mr-xs"></i>
              <span className="text-thinner">
                {formatDistanceToNow(new Date(item.date), {
                  addSuffix: false,
                  locale: getDateLocale(lang),
                })}
              </span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
