import Image from "next/image";
import { Link } from "../Link";
import styles from "./GalleryItem.module.scss";
import { motion } from "framer-motion";

export default function GalleryItem({ item, index, type, lang }) {
  const url = type === "illustrations" ? "/illustrations/" : "/hqs/";
  const thumb = type === "illustrations" ? item.src : item.src[0];
  return (
    <Link className={styles.item} key={item.id} href={url + item.id}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <Image
          src={thumb}
          width={360}
          height={360}
          title={item.title[lang]}
          alt={item.description[lang]}
          unoptimized
        />
        <h6>{item.title[lang]}</h6>
      </motion.div>
    </Link>
  );
}
