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
          <li className="page-item"><button className="page-link btn-light" onClick={() => onPageChange("&laquo;")}><span aria-hidden="true">&laquo;</span></button></li>
          <li className="page-item"><button className="page-link btn-light" onClick={() => onPageChange("&lsaquo;")}><span aria-hidden="true">&lsaquo;</span></button></li>
          {
            pageNumbers2.map(number => {
              if (number === page) {
                return (
                  <li className="page-item active" key={number}>
                    <button className="page-link btn-light" onClick={() => onPageChange(number)}>{number}</button>
                  </li>
                )
              } else {
                return (
                  <li className="page-item" key={number}>
                    <button className="page-link btn-light" onClick={() => onPageChange(number)}>{number}</button>
                  </li>
                )
              }
            })
          }
          <li className="page-item"><button className="page-link btn-light" onClick={() => onPageChange("&rsaquo;")}><span aria-hidden="true">&rsaquo;</span></button></li>
          <li className="page-item"><button className="page-link btn-light" onClick={() => onPageChange("&raquo;")}><span aria-hidden="true">&raquo;</span></button></li>
        </ul>
      </nav>

    </div>
  )
}

export default Pagination