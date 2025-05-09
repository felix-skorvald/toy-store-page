import "./home.css";
import Hero from "../components/Hero.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import { Link } from "react-router";

const Home = () => {
    return (
        <div className="home">
            <Hero />
        </div>
    );
};

export default Home;
