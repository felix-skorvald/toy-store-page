import { useEffect, useState } from "react";
import { getProducts } from "../data/crud.js";
import { useProductsStore } from "../data/store.js";
import ProductCard from "../components/ProductCard.jsx";
import Filter from "../components/Filter.jsx";

import "./products.css";

const Products = () => {
    const productsToRender = useProductsStore((state) => state.productsToRender);
    const setProductList = useProductsStore((state) => state.setProductList);
    const setProductsToRender = useProductsStore((state) => state.setProductsToRender);
    useEffect(() => {
        getProducts(setProductList);
        getProducts(setProductsToRender);
    }, []);

    const handleTest = () => {
        console.log(productsToRender);
    };

    return (
        <div>
            <Filter />
            {/* detta kan va en egen komponent sen och filter en egen också maybe? */}
            <div className="product-grid">
                {productsToRender.map((product) => (
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
