import styles from "./ImageModal.module.scss";

export default function ImageModal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className={styles.imageModalOverlay} onClick={onClose}>
      <div className={styles.imageModalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.imageModalClose} onClick={onClose}>✖</button>
        {children}
      </div>
    </div>
  );
}
