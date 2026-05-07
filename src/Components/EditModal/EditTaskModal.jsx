import React, { useEffect, useState } from "react";
import "./EditTaskModal.css";

const EditTaskModal = ({
  isOpen,
  onClose,
  task,
  onUpdate,
  boardColumns,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");
  const [status, setStatus] =
    useState("To Do");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
    }
  }, [task]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!title || !description) {
      alert("Please fill all fields");
      return;
    }

    onUpdate({
      ...task,
      title,
      description,
      status,
    });

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Edit Task</h2>

          <button
            className="close-btn"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="modal-body">

          <div className="form-group">
            <label>Task Title</label>

            <input
              type="text"
              placeholder="Enter task title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Task Description</label>

            <textarea
              placeholder="Enter task description"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Task Status</label>

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
            >
              {boardColumns.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>
          </div>

          <button
            className="update-btn"
            onClick={handleSubmit}
          >
            Update Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;