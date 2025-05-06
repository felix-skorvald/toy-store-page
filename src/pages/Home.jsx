import "./home.css";
import { Link } from "react-router"

const Home = () => {
    return (
        <div className="home">
            <h1>Welcome to the Toy Store</h1>
            <Link to="/products">produkter</Link>
        </div>
    );
};

export default Home;