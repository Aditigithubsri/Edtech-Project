import React from "react";
import "./Pagination.css";

const Pagination = ({
  totalPages,
  currentPage,
  setCurrentPage,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          className={
            currentPage === index + 1
              ? "page-btn active-page"
              : "page-btn"
          }
          onClick={() =>
            setCurrentPage(index + 1)
          }
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;