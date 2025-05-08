import "./header.css";
import { useAdminStore } from "../data/store";
import { NavLink } from "react-router";

const Header = () => {
    const isAdmin = useAdminStore((state) => state.isAdmin);

    return (
        <header className="header">
            <NavLink to="/"><h1>TOYS M I</h1></NavLink>
            <NavLink to="/products">Alla Produkter</NavLink>
            {!isAdmin ? (<NavLink to="/cart">Cart</NavLink>) : (<p>Logga ut</p>)}
        </header >
    );
};

export default Header;