import "./home.css";
import Hero from "../components/Hero.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import Filter from "../components/Filter.jsx";
import { useEffect } from "react";
import { getCategories } from "../data/crud.js";
import { useProductsStore } from "../data/store.js";

const Home = () => {
    const setCategoryList = useProductsStore((state) => state.setCategoryList);
    const categoryList = useProductsStore((state) => state.categoryList);
    useEffect(() => {
        getCategories(setCategoryList);
    }, []);
    return (
        <div className="home">
            <Hero />
            <Filter />
            <h2>Våra produkter</h2>
            <ProductGrid />
        </div>
    );
};

export default Home;
