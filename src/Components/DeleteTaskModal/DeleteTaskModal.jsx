import React from "react";
import "./DeleteTaskModal.css";

const DeleteTaskModal = ({
  isOpen,
  onClose,
  onConfirm,
  task,

  /* CUSTOM PROPS */

  title = "Delete Task",
  message = "Are you sure you want to delete this task?",
  confirmText = "Yes",
  cancelText = "No",
  showTaskInfo = true,
}) => {
  if (!isOpen) return null;

  return (
    <div className="delete-modal-overlay">
      <div className="delete-modal-container">
        <div className="delete-modal-header">
          <h2>{title}</h2>
        </div>

        <div className="delete-modal-body">
          <p>{message}</p>

          {showTaskInfo && (
            <div className="delete-task-info">
              <h3>{task?.title}</h3>

              <span>{task?.status}</span>
            </div>
          )}

          <div className="delete-modal-actions">
            <button
              className="cancel-btn"
              onClick={onClose}
            >
              {cancelText}
            </button>

            <button
              className="confirm-delete-btn"
              onClick={() => {
                onConfirm(task?.id);
                onClose();
              }}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteTaskModal;