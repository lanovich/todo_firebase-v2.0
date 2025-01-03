import React from "react";
import styles from "./modal-window.module.css";

interface ModalWindowProps {
  isOpen: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
  taskName?: string
}

export const ModalWindow: React.FC<ModalWindowProps> = ({
  isOpen,
  title,
  description,
  onConfirm,
  onCancel,
  taskName,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.modal}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        <p className={styles.helpTextConfirmDelete}>{taskName}</p>
        <div className={styles.actions}>
          <button onClick={onConfirm} className={`${styles.button} ${styles.confirm}`}>
            Подтвердить
          </button>
          <button onClick={onCancel} className={`${styles.button} ${styles.cancel}`}>
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};
