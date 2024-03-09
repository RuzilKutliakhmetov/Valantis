import React, { useId } from "react";
import Pagination from './Pagination';
function Table({ products, setLimit, setPage, page, limit, limitPages }) {
  // Настройка кол-во элементов таблицы
  const limitPagesSelectId = useId();
  const pagesCount = Math.ceil(products.length / limit);

  const lastProductIndex = page * limit;
  const firstProductIndex = lastProductIndex - limit;
  const currentProduct = products.slice(firstProductIndex, lastProductIndex);

  const handleSelectChange = (event) => {
    setLimit(event.target.value);
    setPage(1);
  };

  function handleSelectPage(value) {
    if (value === "&laquo;" || value === "... ") {
      setPage(1);
    } else if (value === "&lsaquo;") {
      if (page !== 1) {
        setPage(page - 1);
      }
    } else if (value === "&rsaquo;") {
      if (page !== pagesCount) {
        setPage(page + 1);
      }
    } else if (value === "&raquo;" || value === " ...") {
      setPage(pagesCount);
    } else {
      setPage(value);
    }
  }

  return (
    <div>
      <div className="row align-items-center mt-1 mb-1">
        <div className="col-1">
          <select
            className="form-select"
            id={limitPagesSelectId}
            defaultValue={limitPages}
            onChange={handleSelectChange}
          >
            <option value={limitPages}>{limitPages}</option>
            <option value={limitPages * 2}>{limitPages * 2}</option>
            <option value={limitPages * 3}>{limitPages * 3}</option>
            <option value={limitPages * 4}>{limitPages * 4}</option>
          </select>
        </div>
        <div className="col-1">
          <Pagination page={page} limit={limit} total={products.length} siblings={1} onPageChange={handleSelectPage} />
        </div>

      </div>
      <table className="table table-striped text-center table-lightrounded-1">
        <thead>
          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Product</th>
            <th className="p-3">Brand</th>
            <th className="p-3">Price</th>
          </tr>
        </thead>
        <tbody>
          {currentProduct.map(product =>
          (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.product}</td>
              <td> {
                product.brand ?
                  <div>{product.brand}</div>
                  :
                  <div></div>
              }</td>
              <td>{product.price}</td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>

  )
}

export default Table;