import React from "react";
import "./BoardSection.css";

const BoardSection = ({
  boardColumns,
  paginatedTasks,
  filter,
  handleMoveTask,
  handleEdit,
  openDeleteModal,
}) => {
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
            <div className="column-header">
              <h2>{column}</h2>

              <span>
                {columnTasks.length}
              </span>
            </div>

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
          </div>
        );
      })}
    </div>
  );
};

export default BoardSection;