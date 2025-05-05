import { useEffect, useState } from "react";
import { getProducts } from "../data/crud.js";
import { useProductsStore } from "../data/store.js";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../data/database.js"; // din db-export

const Products = () => {
    const products = useProductsStore((state) => state.productList);
    const setProductList = useProductsStore((state) => state.setProductList);

    useEffect(() => {
        getProducts(setProductList);
    }, []);

    const handleTest = () => {
        console.log(products);
    };

    return (
        <div>
            <h1>Products Page</h1>
            {/* detta kan va en egen komponent sen och filter en egen också maybe? */}
            <div className="product-grid"></div>
            {products.map((product) => (
                <div>
                    <p>{product.name}</p>
                    <p>{product.description}</p>
                    <p></p>
                    <p>{product.img}</p>
                </div>
            ))}
            <button onClick={() => handleTest()}>testa</button>
        </div>
    );
};

export default Products;
