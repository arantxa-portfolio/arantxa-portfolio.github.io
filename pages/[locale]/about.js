import Seo from "@/components/Seo";
import { useI18n } from "@/hooks/useI18n";

export default function Sobre() {
  const { t } = useI18n({});

  return (
    <>
      <Seo title={t("about_bar")} />
      <section className="about-section mt-xl mb-xs">
        <div className="avatar"></div>
        <section className="about-content">
          <h2>Arântia</h2>
          <p>{t("about_title")}</p>
        </section>
        <hr />
        <section className="about-content">
          <p>
            {" "}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
            tristique vitae ipsum id feugiat. Morbi vel consectetur metus.
            Praesent est metus, tincidunt eget magna quis, iaculis lacinia orci.
            Praesent eu laoreet diam. Integer id urna mattis justo suscipit
            iaculis a a magna. Proin luctus ut ligula ut commodo. Vivamus
            facilisis sagittis consequat. Fusce vitae diam sed turpis sagittis
            consequat a eu mauris. Mauris quis tellus sollicitudin, suscipit
            metus vitae, tempus mauris. Nam commodo dui sit amet turpis
            tristique, at fringilla nulla molestie. Nam convallis quis odio eu
            consequat. Quisque massa quam, imperdiet id scelerisque at, aliquet
            ac massa. Sed varius pellentesque justo, in pellentesque purus
            scelerisque quis. Praesent et arcu eget dui tincidunt volutpat.
            Fusce dapibus euismod vulputate.
          </p>
        </section>
      </section>
      <div className="banner-about" />
    </>
  );
}
