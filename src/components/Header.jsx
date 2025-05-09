import "./header.css";
import { useAdminStore } from "../data/store";
import { NavLink } from "react-router";

const Header = () => {
    const isAdmin = useAdminStore((state) => state.isAdmin);
    const toggleAdmin = useAdminStore((state) => state.toggleAdmin);

    const handleLogOut = () => {
        toggleAdmin();
    };

    return (
        <header className="header">
            <NavLink to="/">
                <h1>TOYS M I</h1>
            </NavLink>
            <NavLink to="/products">Alla Produkter</NavLink>
            {!isAdmin ? (
                ""
            ) : (
                <NavLink to="/products/addnew">Lägg till ny produkt</NavLink>
            )}
            {!isAdmin ? (
                <NavLink to="/cart">Cart</NavLink>
            ) : (
                <button onClick={handleLogOut}>Logga ut</button>
            )}
        </header>
    );
};

export default Header;
