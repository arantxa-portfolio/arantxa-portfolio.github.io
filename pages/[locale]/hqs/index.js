import Seo from "@/components/Seo";
import { useI18n } from "@/hooks/useI18n";
import hqs from "@/lib/hqs-data.json";
import HQSection from "@/components/HQSection";
import MainBanner from "@/components/MainBanner";

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
  hqs.sort((a, b) => new Date(b.date) - new Date(a.date));
  return {
    props: {
      hqs,
    },
  };
}

export default function HQs({ hqs }) {
  const { t } = useI18n({});

  return (
    <>
      <Seo title={t("hqs_bar")} />
      <MainBanner />
      <HQSection hqs={hqs} />
    </>
  );
}
