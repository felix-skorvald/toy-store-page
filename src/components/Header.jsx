import "./header.css";
import { useAdminStore } from "../data/store";
import toyIcon from "../assets/ic_sharp-smart-toy.svg";
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
                <h1>TOYS AM I</h1>
                <img src={toyIcon} alt="TOYS AM I LOGOTYP" />
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
