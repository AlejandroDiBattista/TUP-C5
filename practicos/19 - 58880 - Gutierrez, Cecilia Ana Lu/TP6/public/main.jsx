const { useState, useEffect } = React;

function App() {
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [user, setUser] = useState('');
    const [message, setMessage] = useState('');
    const [info, setInfo] = useState(null);
    const [showRegister, setShowRegister] = useState(false);

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    const toggleForm = () => {
        setShowRegister(!showRegister);
        setMessage('');
    };

    const handleRegister = async ({ user, password, confirmPassword }) => {
        if (password !== confirmPassword) {
            setMessage('Las contraseñas no coinciden');
            return;
        }
        try {
            const response = await fetch('/registrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user, password })
            });
            const result = await response.json();
            setMessage(result.mensaje);
            if (result.ok) {
                setShowRegister(false);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error al registrar');
        }
    };

    const handleLogin = async ({ user, password }) => {
        try {
            const response = await fetch('/login', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user, password })
            });
            const result = await response.json();
            if (response.ok) {
                setToken(response.headers.get('Autorizacion'));
                setUser(user);
                setMessage('Ha iniciado sesion exitosamente');
            } else {
                setMessage(result.mensaje);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error al iniciar sesión');
        }
    };

    const handleLogout = async () => {
        try {
            const response = await fetch('/logout', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Autorizacion': token
                }
            });
            const result = await response.json();
            setMessage(result.mensaje);
            setToken('');
            setInfo(null);
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error al cerrar sesión');
        }
    };

    const fetchInfo = async () => {
        try {
            const response = await fetch('/info', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Autorizacion': token
                }
            });
            const result = await response.json();
            if (response.ok) {
                setInfo({
                    user: result.usuario.user,
                    password: result.usuario.password,
                    creationDate: result.usuario.creationDate,
                    token: result.token
                });
            }
            setMessage(result.mensaje);
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error al obtener información');
        }
    };

    return (
        <div className="container">
            <h1>TP6 - Sesiones</h1>
            {token ? (
                <LoggedInView user={user} onFetchInfo={fetchInfo} onLogout={handleLogout} info={info} />
            ) : (
                showRegister ? 
                <RegisterForm onRegister={handleRegister} toggleForm={toggleForm} /> :
                <LoginForm onLogin={handleLogin} toggleForm={toggleForm} />
            )}
            {message && <p className="message">{message}</p>}
        </div>
    );
}

function LoginForm({ onLogin, toggleForm }) {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin({ user, password });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <label>
               <i class="fa-solid fa-user fa-xl"></i> 
               <br></br>
               <br></br>
                <input type="text" value={user} onChange={(e) => setUser(e.target.value)} placeholder="Usuario" />
            </label>
            <label>
            <i class="fa-solid fa-lock fa-xl"></i>
            <br></br>
            <br></br>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña"/>
            </label>
            <button type="submit">Log in</button>
            <div className="register-link">
                <p>No tienes una cuenta?</p>
                <button type="button" onClick={toggleForm}>Registrarme</button>
            </div>
        </form>
    );
}

function RegisterForm({ onRegister, toggleForm }) {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister({ user, password, confirmPassword });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Registro</h2>
            <label>
                Usuario:
                <br></br>
                <input type="text" value={user} onChange={(e) => setUser(e.target.value)} />
            </label>
            <label>
                Contraseña:
                <br></br>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </label>
            <label>
                Confirmar Contraseña:
                <br></br>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            </label>
            <button type="submit">Registrar</button>
            <div className="login-link">
                <p>Ya tengo una cuenta</p>
                <button type="button" id="registro" onClick={toggleForm}>Login</button>
            </div>
        </form>
    );
}

function LoggedInView({ user, onFetchInfo, onLogout, info }) {
    return (
        <div className="info-section">
            <h2>Bienvenido, {user}</h2>
            <button onClick={onFetchInfo}>Mostrar Información del Usuario</button>
            <button onClick={onLogout}>Cerrar Sesion</button>
            {info && (
                <div className="secret-info">
                    <h3>Información del Usuario:</h3>
                    <p><strong>Usuario:</strong> {info.user}</p>
                    <p><strong>Contraseña:</strong> {info.password}</p>
                    <p><strong>Token:</strong> {info.token}</p>
                </div>
            )}
        </div>
    );
}


ReactDOM.render(<App />, document.getElementById('root'));