import React, { useState } from "react";
import { useAdminStore } from "../data/store.js";
import "./login.css"

const Login = () => {
    const toggleAdmin = useAdminStore((state) => state.toggleAdmin);
    const isAdmin = useAdminStore((state) => state.isAdmin);
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleLogin = (e) => {
        const acceptedLogin = { username: "admin", password: "password" };
        if (JSON.stringify(credentials) == JSON.stringify(acceptedLogin)) {
            toggleAdmin();
            console.log("du e admin");
            console.log("Logging in with:", credentials);
        } else {
            console.log("Logging in with:", credentials);
            console.log("FEL");
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
                    />
                </div>
                <button onClick={handleLogin}>Logga in</button>


            </div>
        </div>
    ) : (
        <div className="login">inloggad</div>
    );
};

export default Login;
