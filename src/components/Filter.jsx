import React, { useState } from 'react';
import companyLogo from './/logo.jpg';


const Filter = ({ apiPassword, hashedPassword, setproductIDs, setIsLoaded, setError, setPage, allProductsIDs }) => {
  const [inputSearchByPrice, setInputSearchByPrice] = useState('');
  const [inputSearchByBrand, setInputSearchByBrand] = useState('');
  const [inputSearchByName, setInputSearchByName] = useState('');

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
    if (inputSearchByPrice !== "" || inputSearchByName !== "" || inputSearchByBrand !== "") {
      setIsLoaded(false);
      setproductIDs(allProductsIDs);
      setInputSearchByName('');
      setInputSearchByPrice('');
      setInputSearchByBrand('');
      setPage(1);
    }

  }
  return (
    <div className="row align-items-center">
      <div className="col-8">
        <img src={companyLogo} className="img-fluid" alt="Valantis" />
      </div>
      <div className="col-4">
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
        <button className="btn btn-light" type="button" onClick={clearFilters}>Очистить фильтры</button>
      </div>
    </div>
  )
}

export default Filter