
import React, { useEffect, useState, useId } from 'react';
import md5 from 'md5';
import Table from './components/Table';
import Pagination from './components/Pagination';

function App() {
  // Инициализация переменных для запроса API
  const currentDate = new Date();
  const currentDay = String(currentDate.getDate()).padStart(2, '0');
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
  const currentYear = String(currentDate.getFullYear());
  const password = `Valantis_${currentYear}${currentMonth}${currentDay}`;
  const hashedPassword = md5(password);
  const apiPassword = 'Valantis';
  // Настройка кол-во элементов таблицы
  const limitPages = 50;
  const limitPagesSelectId = useId();

  const [productIDs, setproductIDs] = useState([]);
  const [allProductsIDs, setallProductsIDsIDs] = useState([]);
  const [products, setProducts] = useState([]);

  const [limit, setLimit] = useState(limitPages);
  const [page, setPage] = useState(1);
  const pagesCount = Math.ceil(products.length / limit);

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [inputSearchByPrice, setInputSearchByPrice] = useState('');
  const [inputSearchByBrand, setInputSearchByBrand] = useState('');
  const [inputSearchByName, setInputSearchByName] = useState('');

  useEffect(() => {
    const getItems = async () => {
      try {
        setPage(1);
        setError(null);
        const postData = {
          password: apiPassword,
          action: 'get_items',
          params: { ids: productIDs }
        };
        const response = await fetch('https://api.valantis.store:41000/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Auth': hashedPassword,
          },
          body: JSON.stringify(postData)
        });
        const data = Object.values(await response.json())[0];
        const uniqueArray = data.filter((value, index, self) =>
          index === self.findIndex((t) => (
            t.id === value.id
          )));
        setProducts(uniqueArray);
        setIsLoaded(true);
      }
      catch (error) {
        console.error('Error:', error);
        setError(error);
        getItems();
      }
    }
    if (productIDs.length > 0) getItems();
  }, [productIDs]);

  useEffect(() => {
    const getAllData = async () => {
      try {
        setError(null);
        const postData = {
          password: apiPassword,
          action: 'get_ids'
        };
        const response = await fetch('https://api.valantis.store:41000/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Auth': hashedPassword,
          },
          body: JSON.stringify(postData)
        });
        const arrayProductsID = Object.values(await response.json())[0];
        setproductIDs(arrayProductsID);
        setallProductsIDsIDs(arrayProductsID);
      } catch (error) {
        console.error('Error:', error);
        setError(error);
        getAllData();
      }
    };
    getAllData();
  }, []);

  const searchByPrice = async () => {
    try {
      setError(null);
      setIsLoaded(false);
      const postData = {
        password: apiPassword,
        "action": "filter",
        "params": { "price": Number(inputSearchByPrice) }
      };
      const response = await fetch('https://api.valantis.store:41000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth': hashedPassword
        },
        body: JSON.stringify(postData)
      });
      const arrayProductsID = Object.values(await response.json())[0];
      setproductIDs(arrayProductsID);
    }
    catch (error) {
      console.error('Error:', error);
      setError(error);
      searchByPrice();
    }
  };

  const searchByBrand = async () => {
    try {
      setError(null);
      setIsLoaded(false);
      // API запрос
      const postData = {
        password: apiPassword,
        "action": "filter",
        "params": { "brand": inputSearchByBrand }
      };
      const response = await fetch('https://api.valantis.store:41000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth': hashedPassword
        },
        body: JSON.stringify(postData)
      });
      const arrayProductsID = Object.values(await response.json())[0];
      setproductIDs(arrayProductsID);
    }
    catch (error) {
      console.error('Error:', error);
      setError(error);
      searchByBrand();
    }
  };

  const searchByName = async () => {
    try {
      setError(null);
      setIsLoaded(false);
      const postData = {
        password: apiPassword,
        "action": "filter",
        "params": { "product": inputSearchByName }
      };
      const response = await fetch('https://api.valantis.store:41000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth': hashedPassword
        },
        body: JSON.stringify(postData)
      });
      const arrayProductsID = Object.values(await response.json())[0];
      setproductIDs(arrayProductsID);
    }
    catch (error) {
      console.error('Error:', error);
      setError(error);
      searchByName();
    }
  };

  const clearFilters = () => {
    setIsLoaded(false);
    setproductIDs(allProductsIDs);
    setInputSearchByName('');
    setInputSearchByPrice('');
    setInputSearchByBrand('');
    setPage(1);
  }

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
    <div className='container'>
      <div className="col-2">

      </div>
      <div className="col-7">

      </div>
      
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          onChange={e => setInputSearchByPrice(e.target.value)}
          placeholder="Стоимость"
          value={inputSearchByPrice} />
        <span className="input-group-text" id="inputGroup-sizing-default"><button className="page-link" onClick={searchByPrice}> Поиск </button></span>
      </div>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          onChange={e => setInputSearchByBrand(e.target.value)}
          placeholder="Бренд"
          value={inputSearchByBrand} />
        <span className="input-group-text" id="inputGroup-sizing-default"><button className="page-link" onClick={searchByBrand}> Поиск </button></span>
      </div>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          onChange={e => setInputSearchByName(e.target.value)}
          placeholder="Название"
          value={inputSearchByName} />
        <span className="input-group-text" id="inputGroup-sizing-default"><button className="page-link" onClick={searchByName}> Поиск </button></span>
      </div>
      <button className="btn btn-primary" type="button" onClick={clearFilters}>Очистить фильтры</button>

      {
        error ?
          <p>Error {error.message}</p>
          :
          !isLoaded ?
            <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
            :
            <div>
              <div>
                <div>
                  <label htmlFor={limitPagesSelectId}>
                    Количество элементов:
                  </label>
                  <select
                    className="form-select form-select-sm"
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
              </div>
              <Pagination page={page} limit={limit} total={products.length} siblings={1} onPageChange={handleSelectPage} />
              <Table products={currentProduct} />
            </div>
      }
    </div >
  );
}

export default React.memo(App);