import React from 'react';

/**
 * Reusable confirmation modal dialog.
 * @param {boolean} isOpen
 * @param {string} title
 * @param {string} message
 * @param {string} confirmLabel
 * @param {string} cancelLabel
 * @param {string} confirmVariant - 'danger' | 'primary'
 * @param {function} onConfirm
 * @param {function} onCancel
 */
const Modal = ({
  isOpen,
  title = 'Are you sure?',
  message = '',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  confirmVariant = 'danger',
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      data-testid="confirm-modal"
      onClick={(e) => { if (e.target.className === 'modal-overlay') onCancel(); }}
    >
      <div className="modal-box">
        <h3 id="modal-title" className="modal-title">{title}</h3>
        {message && <p className="modal-message">{message}</p>}
        <div className="modal-actions">
          <button
            className="btn modal-cancel"
            onClick={onCancel}
            data-testid="modal-cancel"
          >
            {cancelLabel}
          </button>
          <button
            className={`btn modal-confirm ${confirmVariant === 'danger' ? 'btn-danger' : 'btn primary'}`}
            onClick={onConfirm}
            data-testid="modal-confirm"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
