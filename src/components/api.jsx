import React, { useState, useEffect } from "react";
import md5 from 'md5';
import Table from "./Table";

const Api = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [productIDS, setProductIDs] = useState([]);
    const [products, setProducts] = useState([]);

    // Инициализация переменных для запроса API
    const currentDate = new Date();
    const currentDay = String(currentDate.getDate());
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
    const currentYear = String(currentDate.getFullYear());
    const password = `Valantis_${currentYear}${currentMonth}${currentDay}`;
    const hashedPassword = md5(password);
    const apiPassword = 'Valantis';

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Первый API запрос
                const postDataIDs = {
                    password: apiPassword,
                    action: 'get_ids'
                };
                const response1 = await fetch('https://api.valantis.store:41000/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Auth': hashedPassword
                    },
                    body: JSON.stringify(postDataIDs)
                });

                const dataProductIDs = Object.values(await response1.json())[0];

                console.log(dataProductIDs);
                setProductIDs(dataProductIDs);

                // Второй API запрос после выполнения первого
                const postData2 = {
                    password: apiPassword,
                    action: 'get_items',
                    params: { ids: dataProductIDs }
                };
                const response2 = await fetch('https://api.valantis.store:41000/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Auth': hashedPassword
                    },
                    body: JSON.stringify(postData2)
                });
                // const data2 = await response2.json();

                const data2 = Object.values(await response2.json())[0];

                console.log(data2);
                setProducts(data2);
                setIsLoaded(true);
                // Обработка данных из второго запроса
            } catch (error) {
                console.error('Error:', error);
                setError(error);
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <p>Error {error.message}</p>;
    } else if (!isLoaded) {
        return <p>Loading...</p>;
    } else {
        return (
            <div>
                <Table products={products} />
                {/* <ul>
                {products.map(product => (
                    <li key={product.id}>{product.product}</li>
                ))}
            </ul> */}
            </div>

        );
    }
};

export default Api;