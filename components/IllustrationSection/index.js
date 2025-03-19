import { useI18n } from "@/hooks/useI18n";
import GalleryItem from "../GalleryItem";
import styles from "./IllustrationSection.module.scss";

export default function IllustrationSection({ illustrations }) {
  const { t, lang } = useI18n({});

  return (
    <section className={styles.illustrations}>
      <section className={styles.content}>
        <h2>{t("illustrations")}</h2>
        <div className={styles.gallery}>
          {illustrations.map((il, idx) => (
            <GalleryItem
              item={il}
              index={idx}
              type="illustrations"
              lang={lang}
            />
          ))}
        </div>
      </section>
    </section>
  );
}
