import { useI18n } from "@/hooks/useI18n";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";


export default function Home() {
  const {t} = useI18n({});
  return (
    <>
      <div className="banner" />
      <section>
        <h2>{t("illustrations")}</h2>
        <LanguageSwitcher locale={"pt"}/>
        <LanguageSwitcher locale={"es"}/>
        <LanguageSwitcher locale={"en"}/>
      </section>
      
    </>
  );
}
