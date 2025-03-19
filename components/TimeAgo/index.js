import { format, formatDistanceToNow } from "date-fns";
import { ptBR, es, enUS } from "date-fns/locale";
import styles from "./TimeAgo.module.scss";
import { useI18n } from "@/hooks/useI18n";

function getDateLocale(currentLang) {
  if (currentLang === "es") {
    return es;
  } else if (currentLang === "en") {
    return enUS;
  } else {
    return ptBR;
  }
}

export default function TimeAgo({ date }) {
  const { t, lang } = useI18n({});
  const currentDate = new Date(date);

  return (
    <p
      className={styles.time + " mt-md"}
      title={format(currentDate, t("date_format"), {
        locale: getDateLocale(lang),
      })}
    >
      <i className="bi bi-clock mr-xs"></i>
      <span className="text-thinner">
        {formatDistanceToNow(currentDate, {
          addSuffix: false,
          locale: getDateLocale(lang),
        })}
      </span>
    </p>
  );
}
