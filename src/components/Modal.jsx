import React from 'react';
import styles from './Modal.module.css';

const Modal = ({ title, content, onClose, onConfirm }) => {
  return (
    <div className={styles.modal}>
      <div className={styles['modal-content']}>
        <h2>{title}</h2>
        <p>{content}</p>
        <div className={styles['modal-actions']}>
          <button className={styles.cancel} onClick={onClose}>
            Cancelar
          </button>
          {onConfirm && (
            <button className={styles.confirm} onClick={onConfirm}>
              Confirmar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
