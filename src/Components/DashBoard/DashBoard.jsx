import React, { useEffect, useMemo, useState } from "react";
import "./DashBoard.css";
import Pagination from "../Pagination/Pagination";
import Data from "./Data";
import EditTaskModal from "../EditModal/EditTaskModal";
import DeleteTaskModal from "../DeleteTaskModal/DeleteTaskModal";
import Header from "../Header/Header";
import BoardSection from "../BoardSection/BoardSection";

const DashBoard = () => {
  const boardColumns = [
    "To Do",
    "Blocked",
    "Doing",
    "Code Review",
    "QA",
    "Done",
  ];

  const [tasks, setTasks] = useState(Data);

  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");
  const [taskStatus, setTaskStatus] =
    useState("To Do");

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] =
    useState(1);

  /* EDIT MODAL STATES */

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [selectedTask, setSelectedTask] =
    useState(null);

  /* DELETE MODAL STATES */

  const [
    isDeleteModalOpen,
    setIsDeleteModalOpen,
  ] = useState(false);

  const [
    selectedDeleteTask,
    setSelectedDeleteTask,
  ] = useState(null);

  const tasksPerPage = 6;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  /* ADD TASK */

  const handleSubmit = () => {
    if (!title || !description) {
      alert("Please fill all fields");
      return;
    }

    const newTask = {
      id: Date.now(),
      title,
      description,
      status: taskStatus,
    };

    setTasks((prev) => [
      newTask,
      ...prev,
    ]);

    setTitle("");
    setDescription("");
    setTaskStatus("To Do");
  };

  /* OPEN DELETE MODAL */

  const openDeleteModal = (task) => {
    setSelectedDeleteTask(task);
    setIsDeleteModalOpen(true);
  };

  /* DELETE TASK */

  const handleDelete = (id) => {
    setTasks((prev) =>
      prev.filter((task) => task.id !== id)
    );
  };

  /* OPEN EDIT MODAL */

  const handleEdit = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  /* UPDATE TASK */

  const handleUpdateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === updatedTask.id
          ? updatedTask
          : task
      )
    );
  };

  /* MOVE TASK */

  const handleMoveTask = (id, status) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, status }
          : task
      )
    );
  };

  /* FILTER TASKS */

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesFilter =
        filter === "All"
          ? true
          : task.status === filter;

      const matchesSearch =
        task.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        task.description
          .toLowerCase()
          .includes(search.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [tasks, filter, search]);

  /* PAGINATION */

  const indexOfLastTask =
    currentPage * tasksPerPage;

  const indexOfFirstTask =
    indexOfLastTask - tasksPerPage;

  const paginatedTasks =
    filteredTasks.slice(
      indexOfFirstTask,
      indexOfLastTask
    );

  const totalPages = Math.ceil(
    filteredTasks.length / tasksPerPage
  );

  return (
    <div className="dashboard">
      {/* HEADER */}

      <Header />

      {/* FORM */}

      <div className="task-form-container">
        <h2>Create Task</h2>

        <div className="task-form">
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Task Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />

          <select
            value={taskStatus}
            onChange={(e) =>
              setTaskStatus(e.target.value)
            }
            className="status-select"
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

          <button onClick={handleSubmit}>
            Add Task
          </button>
        </div>
      </div>

      {/* SEARCH + FILTER */}

      <div className="top-bar">
        <input
          type="text"
          placeholder="Search Task"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="search-input"
        />

        <div className="filter-buttons">
          <button
            className={
              filter === "All"
                ? "active"
                : ""
            }
            onClick={() => {
              setFilter("All");
              setCurrentPage(1);
            }}
          >
            All
          </button>

          {boardColumns.map((item) => (
            <button
              key={item}
              className={
                filter === item
                  ? "active"
                  : ""
              }
              onClick={() => {
                setFilter(item);
                setCurrentPage(1);
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* LOADER */}

      {loading ? (
        <div className="loader-grid">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="loader-card"
            ></div>
          ))}
        </div>
      ) : (
        <>
          {/* BOARD SECTION */}

          <BoardSection
            boardColumns={boardColumns}
            paginatedTasks={paginatedTasks}
            filter={filter}
            handleMoveTask={handleMoveTask}
            handleEdit={handleEdit}
            openDeleteModal={openDeleteModal}
          />
        </>
      )}

      {/* EDIT MODAL */}

      <EditTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={selectedTask}
        onUpdate={handleUpdateTask}
        boardColumns={boardColumns}
      />

      {/* DELETE MODAL */}

      <DeleteTaskModal
        isOpen={isDeleteModalOpen}
        onClose={() =>
          setIsDeleteModalOpen(false)
        }
        task={selectedDeleteTask}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default DashBoard;