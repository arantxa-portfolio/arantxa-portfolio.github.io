import { useI18n } from "@/hooks/useI18n";
import styles from "./HQControl.module.scss";

export default function HQControl({ current, onNext, onPrevious, total }) {
  const { t } = useI18n({});

  return (
    <div className={styles.control}>
      <button title={t("back")} onClick={onPrevious} disabled={current === 0}>
        <i className="bi bi-arrow-left-circle-fill"></i>
      </button>
      <span className={styles.pages + " text-thinner"}>
        {current + 1} / {total}
      </span>
      <button
        title={t("next")}
        onClick={onNext}
        disabled={current === total - 1}
      >
        <i className="bi bi-arrow-right-circle-fill"></i>
      </button>
    </div>
  );
}
