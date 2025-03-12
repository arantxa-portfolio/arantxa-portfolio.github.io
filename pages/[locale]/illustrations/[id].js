import { Link } from "@/components/Link";
import { useI18n } from "@/hooks/useI18n";
import illustrations from "@/lib/illustrations-data.json";
import { formatDistanceToNow } from "date-fns";
import { ptBR, es, enUS } from "date-fns/locale";

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
    illustrations.map((il, idx) => ({
      params: { locale, id: `${idx + 1}` },
    }))
  );

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { id } }) {
  const item = illustrations[Number(id) - 1];

  if (item) {
    return { props: { item } };
  } else {
    return { notFound: true };
  }
}

export default function IllustrationDetail({ item }) {
  const { t, lang } = useI18n({});

  return (
    <section className="illustration-container">
      <div className="illustration-image">
        <img src={item.src} />
      </div>
      <div className="illustration-detail">
        <div>
          <Link href="/">
            <i className="bi bi-arrow-left-circle"></i> {t("back")}
          </Link>
          <h3>{item.title[lang]}</h3>
          <p>{item.description[lang]}.</p>
          <p className="time mt-md">
            <i className="bi bi-clock"></i>{" "}
            {formatDistanceToNow(new Date(item.date), {
              addSuffix: false,
              locale: getDateLocale(lang),
            })}
          </p>
        </div>
      </div>
    </section>
  );
}
