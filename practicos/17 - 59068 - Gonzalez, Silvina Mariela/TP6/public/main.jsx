function App() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const [showRegisterForm, setShowRegisterForm] = useState(true);
    const [showLoginForm, setShowLoginForm] = useState(false);

    const url = 'http://localhost:3000';

    const handleRegister = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Las contraseñas no coinciden');
            return;
        }

        const response = await fetch(`${url}/usuarios/crear-usuario`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, contrasena: password })
        });

        const data = await response.json();
        if (response.ok) {
            setMessage('Has sido registrado con éxito.');
        } else {
            setMessage(data.error);
        }
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        const response = await fetch(`${url}/usuarios/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: loginUsername, contrasena: loginPassword })
        });

        const data = await response.json();
        if (response.ok) {
            setMessage(`Sesión iniciada con éxito.`);
            setUserData(data);
            setLoggedIn(true);
        } else {
            setMessage(data.error);
        }
    };

    const handleLogout = async () => {
        const response = await fetch(`${url}/usuarios/logout`, {
            method: 'POST',
        });

        const data = await response.json();
        if (response.ok) {
            setMessage('Sesión cerrada con éxito');
            setLoggedIn(false);
            setUserData(null);
        } else {
            setMessage(data.error);
        }
    };

    return (
        <>
            <header>
                <section className="navbar">
                    {!loggedIn && (
                        <>
                            <a href="#" onClick={() => { setShowRegisterForm(true); setShowLoginForm(false); }}>REGISTRO</a>
                            <a href="#" onClick={() => { setShowLoginForm(true); setShowRegisterForm(false); }}>INICIO DE SESIÓN</a>
                        </>
                    )}
                    {loggedIn && <a href="#" onClick={handleLogout}>CERRAR SESIÓN</a>}
                </section>
            </header>
            <main>
                <section>
                    {!loggedIn && showRegisterForm && (
                        <form onSubmit={handleRegister}>
                            <input
                                type="text"
                                placeholder="Nombre de usuario"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Confirmar contraseña"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <button type="submit" className="submit">REGISTRAR</button>
                        </form>
                    )}
                    {!loggedIn && showLoginForm && (
                        <form onSubmit={handleLogin}>
                            <input
                                type="text"
                                placeholder="Nombre de usuario"
                                value={loginUsername}
                                onChange={(e) => setLoginUsername(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Contraseña"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                            />
                            <button type="submit" className="submit">INICIAR SESIÓN</button>
                        </form>
                    )}
                    {loggedIn && (
                        <section className="mensaje">
                            <h1>Bienvenido, {userData.username}</h1>
                        </section>
                    )}
                    <section className="mensaje">
                        <h1>{message}</h1>
                    </section>
                </section>
            </main>
            <footer>
            </footer>

        </>
    )
}