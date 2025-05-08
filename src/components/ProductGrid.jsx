import { useEffect } from "react";
import { getProducts } from "../data/crud.js";
import { useProductsStore } from "../data/store.js";
import ProductCard from "../components/ProductCard.jsx";

const ProductGrid = () => {
    const productsToRender = useProductsStore((state) => state.productsToRender);
    const setProductList = useProductsStore((state) => state.setProductList);
    const setProductsToRender = useProductsStore((state) => state.setProductsToRender);
    useEffect(() => {
        getProducts(setProductList);
        getProducts(setProductsToRender);
    }, []);
    return (
        <div className="product-grid">
            {productsToRender.map((product) => (
                <ProductCard
                    className="product-card"
                    key={product.id}
                    product={product}
                />
            ))}
        </div>
    );
};

export default ProductGrid;