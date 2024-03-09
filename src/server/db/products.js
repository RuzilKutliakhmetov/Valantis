import React, { useEffect, useState } from 'react';
import axios from 'axios';
import md5 from 'md5';

export const GetProducts = function (page, limit) {
    // Инициализация переменных для запроса API
    const currentDate = new Date();
    const currentDay = String(currentDate.getDate());
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
    const currentYear = String(currentDate.getFullYear());
    const password = `Valantis_${currentYear}${currentMonth}${currentDay}`;
    const hashedPassword = md5(password);
    const apiPassword = 'Valantis';

    async function LoadProductIDs() {
        try {
            const postData = {
                password: apiPassword,
                action: 'get_ids'
            }
            const result = await axios.post('https://api.valantis.store:41000/', postData, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Auth': hashedPassword
                },
            });
            console.log('ids: ', result.data);
            const arrProductsID = Object.values(result.data)[0];
            setProductIDs(arrProductsID);
        }
        catch (error) {
            console.error(error);
        }
    }
    (async () => await LoadProductIDs())();

    const [productIDs, setProductIDs] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function LoadProductIDs() {
            try {
                const postData = {
                    password: apiPassword,
                    action: 'get_ids'
                }
                const result = await axios.post('https://api.valantis.store:41000/', postData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Auth': hashedPassword
                    },
                });
                console.log('ids: ', result.data);
                const arrProductsID = Object.values(result.data)[0];
                setProductIDs(arrProductsID);
            }
            catch (error) {
                console.error(error);
            }
        }
        (async () => await LoadProductIDs())();
    }, []);

    useEffect(() => {
        async function LoadProducts() {
            try {
                const postData = {
                    password: apiPassword,
                    action: 'get_items',
                    params: { ids: productIDs }
                }
                // console.log('postData: ', postData);
                const result = await axios.post('https://api.valantis.store:41000/', postData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Auth': hashedPassword
                    },
                });
                console.log('items: ', result.data);
                const arrProducts = Object.values(result.data)[0];
                console.log('arrProducts: ', arrProducts);
                setProducts(arrProducts);
            }
            catch (error) {
                console.error(error);
            }

        }
        (async () => await LoadProducts())();
    }, [productIDs]);

    let productsArray = [];
    for (let i = (page - 1) * limit; i < (page * limit); i++) {
        productsArray.push(products[i]);
    }
    return productsArray;
}

// export const getLength = function () {
//     return products.length;
// }