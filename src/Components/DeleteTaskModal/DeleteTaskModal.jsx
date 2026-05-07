import React from "react";
import "./DeleteTaskModal.css";

const DeleteTaskModal = ({
  isOpen,
  onClose,
  onConfirm,
  task,
}) => {
  if (!isOpen) return null;

  return (
    <div className="delete-modal-overlay">
      <div className="delete-modal-container">
        <div className="delete-modal-header">
          <h2>Delete Task</h2>
        </div>

        <div className="delete-modal-body">
          <p>
            Are you sure you want to delete
            this task?
          </p>

          <div className="delete-task-info">
            <h3>{task?.title}</h3>

            <span>{task?.status}</span>
          </div>

          <div className="delete-modal-actions">
            <button
              className="cancel-btn"
              onClick={onClose}
            >
              No
            </button>

            <button
              className="confirm-delete-btn"
              onClick={() => {
                onConfirm(task.id);
                onClose();
              }}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteTaskModal;