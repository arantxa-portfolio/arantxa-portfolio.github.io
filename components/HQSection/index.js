import { useI18n } from "@/hooks/useI18n";
import styles from "./HQSection.module.scss";
import GalleryItem from "../GalleryItem";

export default function HQSection({ hqs }) {
  const { t, lang } = useI18n({});

  return (
    <section className={styles.hqs}>
      <section className={styles.content}>
        <h2>{t("hqs")}</h2>
        <hr className="mb-md"/>
        <div className={styles.gallery}>
          {hqs.map((hq, idx) => (
            <GalleryItem
              key={hq.id}
              item={hq}
              index={idx}
              type="hqs"
              lang={lang}
            />
          ))}
        </div>
      </section>
    </section>
  );
}
