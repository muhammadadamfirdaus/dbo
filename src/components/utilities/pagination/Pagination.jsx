import React from "react";

function Pagination({ postPerPage, totalPosts, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <nav>
        <ul className="pagination flex justify-center">
          {pageNumbers.map((number) => (
            <li key={number} className="page-item px-4 py-2 border border-slate-500 hover:bg-slate-500">
              <span onClick={() => paginate(number)} className="page-link">
                {number}
              </span>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export default Pagination;
