import "./header.css";
import { useAdminStore } from "../data/store";
import toyIcon from "../assets/mdi_child-toy.svg";
import cartIcon from "../assets/solar_cart-bold.svg"
import { NavLink } from "react-router";

const Header = () => {
    const isAdmin = useAdminStore((state) => state.isAdmin);
    const toggleAdmin = useAdminStore((state) => state.toggleAdmin);

    const handleLogOut = () => {
        toggleAdmin();
    };

    return (
        <header className="header">
            <NavLink to="/" className="logo">
                <h1>TOYS AM I</h1>
                <img src={toyIcon} alt="TOYS AM I LOGOTYP" />
            </NavLink>
            <NavLink to="/products">Alla Leksaker</NavLink>
            {!isAdmin ? (
                ""
            ) : (
                <NavLink to="/products/addnew">Lägg till ny produkt</NavLink>
            )}
            {!isAdmin ? (
                <NavLink to="/cart"><img src={cartIcon} alt="cart" /></NavLink>
            ) : (
                <button onClick={handleLogOut}>Logga ut</button>
            )}
        </header>
    );
};

export default Header;
