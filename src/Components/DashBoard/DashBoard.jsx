import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import "./DashBoard.css";

import Data from "./Data";

import EditTaskModal from "../EditModal/EditTaskModal";
import DeleteTaskModal from "../DeleteTaskModal/DeleteTaskModal";

import Header from "../Header/Header";
import BoardSection from "../BoardSection/BoardSection";
import { toast } from "react-toastify";

const DashBoard = () => {
  const boardColumns = [
    "To Do",
    "Blocked",
    "Doing",
    "Code Review",
    "QA",
    "Done",
  ];

  /* TASKS */

  const [tasks, setTasks] =
    useState(Data);

  /* ADD TASK */

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [taskStatus, setTaskStatus] =
    useState("");

  /* FILTERS */

  const [filter, setFilter] =
    useState("All");

  const [search, setSearch] =
    useState("");

  /* LOADING */

  const [loading, setLoading] =
    useState(true);

  /* EDIT MODAL */

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [selectedTask, setSelectedTask] =
    useState(null);

  /* DELETE MODAL */

  const [
    isDeleteModalOpen,
    setIsDeleteModalOpen,
  ] = useState(false);

  const [
    selectedDeleteTask,
    setSelectedDeleteTask,
  ] = useState(null);

  /* LOADER */

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  /* ADD TASK */

  const handleSubmit = () => {
    if (!title || !description) {
      toast.error("Please fill all the fields");
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
    setTaskStatus("");
  };

  /* MOVE TASK */

  const handleMoveTask = (
    id,
    status
  ) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, status }
          : task
      )
    );
  };

  /* EDIT TASK */

  const handleEdit = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleUpdateTask = (
    updatedTask
  ) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === updatedTask.id
          ? updatedTask
          : task
      )
    );
  };

  /* DELETE TASK */

  const openDeleteModal = (task) => {
    setSelectedDeleteTask(task);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = (id) => {
    setTasks((prev) =>
      prev.filter(
        (task) => task.id !== id
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
          .includes(
            search.toLowerCase()
          ) ||
        task.description
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      return (
        matchesFilter &&
        matchesSearch
      );
    });
  }, [tasks, filter, search]);

  return (
    <div className="dashboard">
      {/* HEADER */}

      <Header />

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
            onClick={() =>
              setFilter("All")
            }
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
              onClick={() =>
                setFilter(item)
              }
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
        <BoardSection
          boardColumns={boardColumns}
          paginatedTasks={
            filteredTasks
          }
          filter={filter}
          handleMoveTask={
            handleMoveTask
          }
          handleEdit={handleEdit}
          openDeleteModal={
            openDeleteModal
          }

          /* ADD TASK */

          handleSubmit={
            handleSubmit
          }
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={
            setDescription
          }
          taskStatus={taskStatus}
          setTaskStatus={
            setTaskStatus
          }
        />
      )}

      {/* EDIT MODAL */}

      <EditTaskModal
        isOpen={isModalOpen}
        onClose={() =>
          setIsModalOpen(false)
        }
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