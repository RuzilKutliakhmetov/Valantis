import React from "react";
import { returnPaginationRange } from "./returnPaginationRange";

const Pagination = ({ page, limit, total, siblings, onPageChange }) => {
  const pageNumbers = [];
  const pageCount = Math.ceil(total / limit);

  for (let i = 1; i <= pageCount; i++) {
    pageNumbers.push(i)
  }

  let pageNumbers2 = returnPaginationRange(pageCount, page, limit, siblings);

  return (
    <div className="col-4">
      <nav aria-label="Page navigation example">
        <ul className="pagination m-0">
          <li className="page-item"><a className="page-link text-bg-light" onClick={() => onPageChange("&laquo;")} href="#"><span aria-hidden="true">&laquo;</span></a></li>
          <li className="page-item"><a className="page-link text-bg-light" onClick={() => onPageChange("&lsaquo;")} href="#"><span aria-hidden="true">&lsaquo;</span></a></li>
          {
            pageNumbers2.map(number => {
              if (number === page) {
                return (
                  <li className="page-item active" key={number}>
                    <a className="page-link text-bg-light" onClick={() => onPageChange(number)} href="#">{number}</a>
                  </li>
                )
              } else {
                return (
                  <li className="page-item" key={number}>
                    <a className="page-link text-bg-light" onClick={() => onPageChange(number)} href="#">{number}</a>
                  </li>
                )
              }
            })
          }
          <li className="page-item"><a className="page-link text-bg-light" onClick={() => onPageChange("&rsaquo;")} href="#"><span aria-hidden="true">&rsaquo;</span></a></li>
          <li className="page-item"><a className="page-link text-bg-light" onClick={() => onPageChange("&raquo;")} href="#"><span aria-hidden="true">&raquo;</span></a></li>
        </ul>
      </nav>

    </div>
  )
}

export default Pagination