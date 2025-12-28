import { useI18n } from "@/hooks/useI18n";
import styles from "./Footer.module.scss";

export function Footer() {
  const { t } = useI18n({});

  return (
    <footer className={styles.footer}>
      <hr />
      <section className={styles.socialLinks}>
        <span>
          <a
            className={styles.socialItem}
            href="https://www.instagram.com/arantia_mt/"
            target="_blank"
            title={t('social_insta')}
          >
            <i className="bi bi-instagram"></i>
          </a>
        </span>
      </section>
      <hr />
      <p className={styles.copyright}>
        &copy; {new Date().getFullYear()} Arântia.{" "}
      </p>
    </footer>
  );
}
