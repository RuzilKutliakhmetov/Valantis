import React, { useEffect, useState } from 'react';
import md5 from 'md5';
import Table from './components/Table';
import Filter from './components/Filter';

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

  const [productIDs, setproductIDs] = useState([]);
  const [allProductsIDs, setallProductsIDsIDs] = useState([]);
  const [products, setProducts] = useState([]);

  const [limit, setLimit] = useState(limitPages);
  const [page, setPage] = useState(1);
  // const pagesCount = Math.ceil(products.length / limit);

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

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



  return (
    <div className='container bg-danger' >
      <Filter apiPassword={apiPassword} hashedPassword={hashedPassword} setproductIDs={setproductIDs} setIsLoaded={setIsLoaded} setError={setError} setPage={setPage} allProductsIDs={allProductsIDs} />
      {
        error ?
          <p> Error: {error.message}</p>
          :
          !isLoaded ?
            <div><span className="spinner-border spinner-border-sm" aria-hidden="true"></span> Loading...</div>
            :
            <div>
              <Table products={products} setLimit={setLimit} setPage={setPage} page={page} limit={limit} limitPages={limitPages} />
            </div>
      }
    </div >
  );
}

export default React.memo(App);