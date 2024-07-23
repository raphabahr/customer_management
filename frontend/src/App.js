import { GoogleLogin } from "@react-oauth/google";
import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import AppClientes from "./AppClientes";
import AppContatos from "./AppContatos";
import './styles/index.css';

function Login() {
    const [credentials, setCredentials] = useState(null);
    const navigate = useNavigate();

    const onSuccess = (credentialResponse) => {
        setCredentials(credentialResponse);
    };

    const onError = () => {
        console.log('Login Failed');
    };

    useEffect(() => {
        if (credentials) {
            const { tokenId } = credentials;
            console.log('Access Token:', tokenId);
            navigate('/clientes');
        }
    }, [credentials, navigate]);

    return (
        <div className="container">
            <div className="login-container">
                <h2 className="login-title">
                    Login Google
                </h2>
                <header>
                    <span>
                        <GoogleLogin
                            clientId="856227088376-2s973hf6jdm36cbmr1cnbo0697s38if3.apps.googleusercontent.com"
                            onSuccess={onSuccess}
                            onError={onError}
                        />
                    </span>
                </header>
            </div>
        </div>
    );
}

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/clientes" element={<AppClientes />} />
            <Route path="/contatos" element={<AppContatos />} />
        </Routes>
    );
}

export default App;
