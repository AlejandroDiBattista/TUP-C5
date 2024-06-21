const { useState } = React;

const App = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [celular, setCelular] = useState("");
    const [email, setEmail] = useState("");
    const [dni, setDni] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [error, setError] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            if (response.ok) {
                setLoggedIn(true);
                setError("");
            } else {
                setError(data.error || "Error al iniciar sesión");
            }
        } catch (err) {
            setError("Error al iniciar sesión");
        }
    };

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, celular, email, dni })
            });

            const data = await response.json();
            if (response.ok) {
                setError("");
                setIsRegistering(false);
                setUsername("");
                setPassword("");
                setConfirmPassword("");
                setCelular("");
                setEmail("");
                setDni("");
            } else {
                setError(data.error || "Error al registrar");
            }
        } catch (err) {
            setError("Error al registrar");
        }
    };

    const handleLogout = () => {
        setLoggedIn(false);
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        setCelular("");
        setEmail("");
        setDni("");
    };

    const InfoPage = () => {
        const userInfo = { name: 'Nombre del Usuario' };

        const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);

        const dismissWelcomeMessage = () => {
            setShowWelcomeMessage(false);
        };

        return (
            <div>
                {showWelcomeMessage && (
                    <div className="welcome-banner">
                        <p>Bienvenido, {userInfo.name}!</p>
                        <button onClick={dismissWelcomeMessage}>Cerrar</button>
                    </div>
                )}
                <h2>Información Confidencial</h2>
                <p>Esta es información sensible que solo puede ser vista si estás logueado.</p>
            </div>
        );
    };

    return (
        <div>
            <h1>TP6 - Sesiones</h1>
            {loggedIn ? (
                <>
                    <button onClick={handleLogout}>Cerrar Sesión</button>
                    <InfoPage />
                </>
            ) : (
                <form>
                    <h1 className="titulo">{isRegistering ? "Registrar" : "Login"}</h1>
                    <label>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                        </svg>
                        <input
                            placeholder="Username"
                            type="text"
                            id="usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                    <label>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock-fill" viewBox="0 0 16 16">
                            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                        </svg>
                        <input
                            placeholder="Password"
                            type="password"
                            id="contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    {isRegistering && (
                        <>
                            <label>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lock-fill" viewBox="0 0 16 16">
                                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                                </svg>
                                <input
                                    placeholder="Confirmar Password"
                                    type="password"
                                    id="confirmar-contraseña"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </label>
                            <label>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-phone" viewBox="0 0 16 16">
                                    <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zm0 1H5v12h6V2z"/>
                                    <path d="M8 11.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                                </svg>
                                <input
                                    placeholder="Celular"
                                    type="text"
                                    id="celular"
                                    value={celular}
                                    onChange={(e) => setCelular(e.target.value)}
                                />
                            </label>
                            <label>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm14 0v-.05L8 8.02 2 3.95V4H0v8h16V4h-2zm-1-.35L8 7.58 3 3.65V4h10v-.35z"/>
                                </svg>
                                <input
                                    placeholder="Email"
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </label>
                            <label>
                                <svg // main.jsx (continuación)

xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-card-text" viewBox="0 0 16 16">
                                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm14 0v-.5H2V4h12zM2 5v5h12V5H2zm2.5 1a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm0 2a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 2a.5.5 0 0 0 0 1h2.5a.5.5 0 0 0 0-1H4.5z"/>
                                </svg>
                                <input
                                    placeholder="DNI"
                                    type="text"
                                    id="dni"
                                    value={dni}
                                    onChange={(e) => setDni(e.target.value)}
                                />
                            </label>
                        </>
                    )}
                    <button type="button" onClick={isRegistering ? handleRegister : handleLogin}>
                        {isRegistering ? "Registrar" : "Login"}
                    </button>
                    {!isRegistering && (
                        <button type="button" onClick={() => setIsRegistering(true)}>
                            Registrarse
                        </button>
                    )}
                    {error && <p className="error">{error}</p>}
                </form>
            )}
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

