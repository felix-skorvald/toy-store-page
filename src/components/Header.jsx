import "./header.css";
import { useAdminStore } from "../data/store";
import toyIcon from "../assets/mdi_child-toy.svg";
import cartIcon from "../assets/solar_cart-bold.svg"
import { NavLink } from "react-router";
import { useCartStore } from "../data/store.js";
import { useEffect, useState } from "react";

const Header = () => {
    const isAdmin = useAdminStore((state) => state.isAdmin);
    const toggleAdmin = useAdminStore((state) => state.toggleAdmin);
    const cart = useCartStore((state) => state.cart);
    const handleLogOut = () => {
        toggleAdmin();
    };


    return (
        <header className="header">
            <NavLink to="/" className="logo">
                <h1>TOYS AM I</h1>
                <img src={toyIcon} alt="TOYS AM I LOGOTYP" />
            </NavLink>
            <NavLink to="/products" className="all-toys">Alla Leksaker</NavLink>
            {!isAdmin ? (
                ""
            ) : (
                <NavLink to="/products/addnew">Lägg till ny produkt</NavLink>
            )}
            {!isAdmin ? (
                cart.length > 0 ? (
                    <NavLink to="/cart" className="cart-icon">
                        <img src={cartIcon} alt="cart" />
                        {cart.length > 0 ? <p className="cart-counter">{cart.reduce((total, item) => total + item.quantity, 0)}</p> : ""}
                    </NavLink>
                ) : (
                    <img src={cartIcon} alt="cart" style={{ filter: "opacity(0.5)" }} />
                )
            ) : (
                <button onClick={handleLogOut}>Logga ut</button>
            )}
        </header>
    );
};

export default Header;
