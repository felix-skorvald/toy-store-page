import "./footer.css";
import { Link } from "react-router";

const Footer = () => {
    return (
        <footer>
            <p>
                &copy; {new Date().getFullYear()} Toy Store. All rights
                reserved.
            </p>
            <Link to="/Login">Lägg till/Ändra på sidan</Link>
        </footer>
    );
};

export default Footer;
