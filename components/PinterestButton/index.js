import { useI18n } from "@/hooks/useI18n";

export default function PinterestButton({ baseUrl, item, isHQ }) {
  const { t, lang } = useI18n({});

  const media = isHQ ? item.src[0] : item.src;
  const shareUrl = isHQ
    ? `${baseUrl}/hqs/${item.id}`
    : `${baseUrl}/illustrations/${item.id}`;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(item.title[lang]);
  const encodedMediaUrl = encodeURIComponent(baseUrl + media);

  return (
    <a
      href={`https://www.pinterest.com/pin/create/button/?url=${encodedUrl}&media=${encodedMediaUrl}&description=${encodedText}`}
      target="_blank"
    >
      <i className="bi bi-pinterest" />
      <small className="ml-xs">{t("save")}</small>
    </a>
  );
}
