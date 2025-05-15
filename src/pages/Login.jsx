import React, { useState } from "react";
import { useAdminStore } from "../data/store.js";
import { useNavigate } from "react-router";
import "./login.css"

const Login = () => {
    const toggleAdmin = useAdminStore((state) => state.toggleAdmin);
    const isAdmin = useAdminStore((state) => state.isAdmin);
    const navigate = useNavigate()
    const [error, setError] = useState("");
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
        if (e.key === "Enter") {
            handleLogin();
        }
    };

    const handleEnter = e => {
        if (e.key === "Enter") {
            handleLogin();
        }
    }

    const handleLogin = (e) => {
        const acceptedLogin = { username: "admin", password: "password" };
        if (credentials.username == acceptedLogin.username && credentials.password == acceptedLogin.password) {
            toggleAdmin();
            navigate("/products")
            console.log("du e admin");
        } else {
            if (credentials.username == "" || credentials.password == "") {
                setError("Vänligen fyll i båda fälten")
                return
            }

            setError("Vänligen försök igen")


        }
    };

    return !isAdmin ? (
        <div className="login">
            <div className="login-container">
                <h2>Logga in</h2>

                <div>
                    <label htmlFor="username">Användarnamn:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                        onKeyDown={handleEnter}
                    />
                </div>
                <div>
                    <label htmlFor="password">Lösenord:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        onKeyDown={handleEnter}
                    />
                </div>
                <p className="error-message">
                    {error}
                </p>
                <button onClick={handleLogin}>Logga in</button>

            </div>
        </div>
    ) : (
        <div className="login">
            <div className="login-container">
                <h2>Inloggad</h2>
            </div>
        </div>
    );
};

export default Login;
