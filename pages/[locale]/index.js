import { useI18n } from "@/hooks/useI18n";
import illustrations from "@/lib/illustrations-data.json";
import Seo from "@/components/Seo";
import IllustrationSection from "@/components/IllustrationSection";
import MainBanner from "@/components/MainBanner";

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
  const { t } = useI18n({});

  return (
    <>
      <Seo title={t("illustrations_bar")} />
      <MainBanner />
      <IllustrationSection illustrations={illustrations} />
    </>
  );
}
