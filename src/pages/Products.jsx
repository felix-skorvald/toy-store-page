import Filter from "../components/Filter.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import ProductView from "../components/ProductView.jsx";
import AddNew from "../components/AddNew.jsx";
import { useProductsStore } from "../data/store.js";
import { useParams } from "react-router";

import "./products.css";

const Products = () => {
    const allProducts = useProductsStore((state) => state.productList);
    const { productId } = useParams();
    const activeProduct = allProducts.find((p) => p.id === productId);

    if (!activeProduct) {
        if (productId == "addnew") {
            return (
                <div>
                    <AddNew />
                </div>
            );
        } else {
            return (
                <div className="products">
                    <Filter />
                    <ProductGrid />
                </div>
            );
        }
    }

    return (
        <div>
            <ProductView product={activeProduct} />
        </div>
    );
};

export default Products;
