const { useState, useEffect } = React;

function App() {
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [info, setInfo] = useState('');

    const handleRegister = async () => {
        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: registerUsername, password: registerPassword })
            });
            const data = await res.json();
            if (res.ok) {
                alert('Registro exitoso');
                setRegisterUsername('');
                setRegisterPassword('');
            } else {
                alert('Error durante el registro');
            }
        } catch (error) {
            alert('Error durante el registro: ' + error.message);
        }
    };

    const handleLogin = async () => {
        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: loginUsername, password: loginPassword })
            });
            const data = await res.json();
            if (res.ok) {
                alert('Inicio de sesión exitoso');
                setLoggedIn(true);
                setInfo('');
                setLoginUsername('');
                setLoginPassword('');
            } else {
                alert('Credenciales incorrectas');
            }
        } catch (error) {
            alert('Error durante el inicio de sesión: ' + error.message);
        }
    };

    const handleLogout = async () => {
        try {
            const res = await fetch('/api/logout', {
                method: 'POST'
            });
            const data = await res.json();
            if (res.ok) {
                alert('Sesión cerrada exitosamente');
                setLoggedIn(false);
                setInfo('');
            } else {
                alert('Error al cerrar sesión');
            }
        } catch (error) {
            alert('Error al cerrar sesión: ' + error.message);
        }
    };

    const getInfo = async () => {
        try {
            const res = await fetch('/api/info');
            const data = await res.json();
            if (res.ok) {
                setInfo(data.message);
            } else {
                alert('No se pudo obtener la información');
            }
        } catch (error) {
            alert('Error al obtener la información: ' + error.message);
        }
    };

    useEffect(() => {
        if (loggedIn) {
            getInfo();
        }
    }, [loggedIn]);

    return (
        <div>
            <h1>TP6 - Sesiones</h1>
            {!loggedIn ? (
                <div>
                    <h2>Registro</h2>
                    <input
                        type="text"
                        placeholder="Usuario"
                        value={registerUsername}
                        onChange={(e) => setRegisterUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                    />
                    <button onClick={handleRegister}>Registrarse</button>
                    <h2>Iniciar Sesión</h2>
                    <input
                        type="text"
                        placeholder="Usuario"
                        value={loginUsername}
                        onChange={(e) => setLoginUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                    />
                    <button onClick={handleLogin}>Iniciar Sesión</button>
                </div>
            ) : (
                <div>
                    <h2>Información del Usuario</h2>
                    <p>{info}</p>
                    <button className="logout-btn" onClick={handleLogout}>Cerrar Sesión</button>
                </div>
            )}
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);