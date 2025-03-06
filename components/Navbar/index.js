import { Link } from "../Link";
import styles from "./Navbar.module.scss";
import { useRouter } from "next/router";
import { useI18n } from "@/hooks/useI18n";

export function Navbar() {
  const router = useRouter();
  const {t} = useI18n({});

  const isActive = (href) => {
    console.log("href = ", href, router.pathname,router.pathname.endsWith(href));
    return router.pathname === href;
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.brand}>
        <h1>Arântia</h1>
      </div>
      <nav className={styles.navlinks}>
        <li>
          <Link href="/" className={isActive("/[locale]") ? styles.active : ""}>
            {t("illustrations")}
          </Link>
        </li>
        <li>
          <Link
            href="/hqs"
            className={isActive("/[locale]/hqs") ? styles.active : ""}
          >
            {t("hqs")}
          </Link>
        </li>
        <li>
          <Link href="/sobre" className={isActive("/[locale]/sobre") ? styles.active : ""}>
            {t("about")}
          </Link>
        </li>
      </nav>
    </header>
  );
}
