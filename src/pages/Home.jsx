import "./home.css";
import Hero from "../components/Hero.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import Filter from "../components/Filter.jsx";
import { useEffect } from "react";
import { getCategories, getProducts } from "../data/crud.js";
import { useProductsStore } from "../data/store.js";

const Home = () => {
    const setProductList = useProductsStore((state) => state.setProductList);
    const products = useProductsStore((state) => state.productList)
    useEffect(() => {
        getProducts(setProductList);

    }, []);

    return (
        <div className="home">
            <Hero />
            <h2>I blickfånget</h2>
            <div className="spotlight">
                {products.slice(0, 4).map((product) => (
                    <div className="home-products" key={product.id}>
                        <img src={product.img} alt={product.name} />
                        <h2>{product.name}</h2>


                    </div>
                ))}

            </div>
        </div>
    );
};

export default Home;
