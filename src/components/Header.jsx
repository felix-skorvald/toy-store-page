import "./header.css";
import { NavLink } from "react-router";

const Header = () => {
    return (
        <header className="header">
            <NavLink to="/"><h1>TOYS M I</h1></NavLink>
            <NavLink to="/products">Alla Produkter</NavLink>
            <p>cart</p>
        </header>
    );
};

export default Header;