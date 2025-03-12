import { Link } from "@/components/Link";
import hqs from "@/lib/hqs-data.json";
import { useI18n } from "@/hooks/useI18n";

export async function getStaticPaths() {
  const locales = ["en", "pt", "es"];
  const paths = locales.flatMap((locale) =>
    hqs.map((hq, idx) => ({
      params: { locale, id: `${idx + 1}` },
    }))
  );

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { id } }) {
  const item = hqs[Number(id) - 1];

  if (item) {
    return { props: { item } };
  } else {
    return { notFound: true };
  }
}

export default function HQDetail({ item }) {
  const { t, lang } = useI18n({});
  return (
    <>
      <section className="hq-container">
        <div className="hq-image">
          {item.src.map((i, idx) => (
            <img key={idx} src={i} alt={`Page ${idx + 1}`} />
          ))}
        </div>
        <div className="hq-detail">
          <div>
            <Link href="/hqs">
              <i className="bi bi-arrow-left-circle"></i> {t("back")}
            </Link>
            <h3>{item.title[lang]}</h3>
            <p>{item.description[lang]}.</p>
          </div>
        </div>
      </section>
    </>
  );
}
