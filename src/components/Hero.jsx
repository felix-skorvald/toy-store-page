import { NavLink } from "react-router";

const Hero = () => {
    return (
        <div className="hero">
            <NavLink to="/products">
                KOLLA IN VÅRA LEKSAKER!
            </NavLink>
        </div>
    );
};

export default Hero;
