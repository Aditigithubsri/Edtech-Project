import React from "react";

import { RxCross2 } from "react-icons/rx";

import { toast } from "react-toastify";

import "./BoardSection.css";

const BoardSection = ({
  boardColumns,
  paginatedTasks,
  filter,
  handleMoveTask,
  handleEdit,
  openDeleteModal,

  /* ADD TASK */

  handleSubmit,
  title,
  setTitle,
  description,
  setDescription,
  taskStatus,
  setTaskStatus,
}) => {

  const validateAndSubmit = () => {

    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    // if (!description.trim()) {
    //   toast.error(
    //     "Description is required"
    //   );
    //   return;
    // }

    handleSubmit();
  };

  return (
    <div className="board-container">
      {boardColumns.map((column) => {
        const columnTasks =
          paginatedTasks.filter(
            (task) =>
              task.status === column
          );

        if (
          filter !== "All" &&
          filter !== column
        ) {
          return null;
        }

        return (
          <div
            className="board-column"
            key={column}
          >
            {/* HEADER */}

            <div className="column-header">
              <h2>{column}</h2>

              <span>
                {columnTasks.length}
              </span>
            </div>

            {/* TASKS */}

            <div className="column-cards">
              {columnTasks.length > 0 ? (
                columnTasks.map((task) => (
                  <div
                    className="task-card"
                    key={task.id}
                  >
                    <div className="task-top">
                      <h3>{task.title}</h3>

                      <span className="task-status">
                        {task.status}
                      </span>
                    </div>

                    <p>
                      {task.description}
                    </p>

                    {/* MOVE TASK */}

                    <div className="move-task">
                      <select
                        value={task.status}
                        onChange={(e) =>
                          handleMoveTask(
                            task.id,
                            e.target.value
                          )
                        }
                      >
                        {boardColumns.map(
                          (item) => (
                            <option
                              key={item}
                              value={item}
                            >
                              {item}
                            </option>
                          )
                        )}
                      </select>
                    </div>

                    {/* ACTIONS */}

                    <div className="task-footer">
                      <button
                        className="edit-btn"
                        onClick={() =>
                          handleEdit(task)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          openDeleteModal(
                            task
                          )
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-card">
                  No Tasks
                </div>
              )}
            </div>

            {/* ADD CARD */}

            <div className="add-card-section">
              {taskStatus !== column ? (
                <button
                  className="add-card-btn"
                  onClick={() =>
                    setTaskStatus(column)
                  }
                >
                  + Add Card
                </button>
              ) : (
                <div className="add-card-form">
                  {/* FORM HEADER */}

                  <div className="form-header">
                    <span>
                      Add New Card
                    </span>

                    <button
                      className="close-form-btn"
                      onClick={() => {
                        setTaskStatus(
                          ""
                        );

                        setTitle("");

                        setDescription(
                          ""
                        );
                      }}
                    >
                      <RxCross2 size={18} />
                    </button>
                  </div>

                  {/* TITLE */}

                  <input
                    type="text"
                    placeholder="Task title"
                    value={title}
                    onChange={(e) =>
                      setTitle(
                        e.target.value
                      )
                    }
                  />

                  {/* DESCRIPTION */}

                  <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) =>
                      setDescription(
                        e.target.value
                      )
                    }
                  />

                  {/* BUTTON */}

                  <button
                    onClick={
                      validateAndSubmit
                    }
                  >
                    Create Task
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BoardSection;