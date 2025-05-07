import { useEffect, useState } from "react";
import { getProducts } from "../data/crud.js";
import { useProductsStore } from "../data/store.js";
import ProductCard from "../components/ProductCard.jsx";
import Filter from "../components/Filter.jsx";

import "./products.css";

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
            <Filter />
            {/* detta kan va en egen komponent sen och filter en egen också maybe? */}
            <div className="product-grid">
                {products.map((product) => (
                    <ProductCard
                        className="product-card"
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>

            <button onClick={() => handleTest()}>testa</button>
        </div>
    );
};

export default Products;
