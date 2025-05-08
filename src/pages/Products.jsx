
import Filter from "../components/Filter.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import ProductView from "../components/ProductView.jsx";
import { useProductsStore } from "../data/store.js";
import { useParams } from "react-router";

import "./products.css";

const Products = () => {
    const allProducts = useProductsStore((state) => state.productList);
    const { productId } = useParams()
    const activeProduct = allProducts.find(p => p.id === productId)
    console.log(activeProduct)

    if (!activeProduct) {
        return (
            <div>
                <Filter />
                <ProductGrid />
            </div>
        )
    }


    return (
        <div>
            <ProductView product={activeProduct} />
        </div>
    );
};

export default Products;
