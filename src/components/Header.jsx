import "./header.css";
import { useAdminStore } from "../data/store";
import { NavLink } from "react-router";

const Header = () => {
    const isAdmin = useAdminStore((state) => state.isAdmin);
    const toggleAdmin = useAdminStore(state => state.toggleAdmin)

    const handleLogOut = () => {
        toggleAdmin();
    }
    const handleAddNew = () => {
        toggleAdmin();
    }

    return (
        <header className="header">
            <NavLink to="/"><h1>TOYS M I</h1></NavLink>
            <NavLink to="/products">Alla Produkter</NavLink>
            {!isAdmin ? "" : (<button onClick={handleAddNew}>Lägg till ny produkt</button>)}
            {!isAdmin ? (<NavLink to="/cart">Cart</NavLink>) : (<button onClick={handleLogOut}>Logga ut</button>)}
        </header >
    );
};

export default Header;