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
                setMessage('Usuario logueado exitosamente');
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
            <h1>Gestión de Sesiones</h1>
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
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin({ user, password });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <label>
                Usuario:
                <input type="text" value={user} onChange={(e) => setUser(e.target.value)} />
            </label>
            <label>
                Contraseña:
                <div className="password-wrapper">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="button" className="password-toggle" onClick={togglePasswordVisibility}>
                        {showPassword ? 'Ocultar' : 'Mostrar'}
                    </button>
                </div>
            </label>
            <button type="submit">Login</button>
            <div className="register-link">
                <p>¿No estás registrado?</p>
                <button type="button" onClick={toggleForm}>Registrarse</button>
            </div>
        </form>
    );
}

function RegisterForm({ onRegister, toggleForm }) {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister({ user, password, confirmPassword });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Registro</h2>
            <label>
                Usuario:
                <input type="text" value={user} onChange={(e) => setUser(e.target.value)} />
            </label>
            <label>
                Contraseña:
                <div className="password-wrapper">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="button" className="password-toggle" onClick={togglePasswordVisibility}>
                        {showPassword ? 'Ocultar' : 'Mostrar'}
                    </button>
                </div>
            </label>
            <label>
                Confirmar Contraseña:
                <div className="password-wrapper">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button type="button" className="password-toggle" onClick={togglePasswordVisibility}>
                        {showPassword ? 'Ocultar' : 'Mostrar'}
                    </button>
                </div>
            </label>
            <button type="submit">Registrar</button>
            <div className="login-link">
                <p>¿Ya estás registrado?</p>
                <button type="button" onClick={toggleForm}>Login</button>
            </div>
        </form>
    );
}

function LoggedInView({ user, onFetchInfo, onLogout, info }) {
    return (
        <div className="info-section">
            <h2>Bienvenido, {user}</h2>
            <button onClick={onFetchInfo}>Mostrar información </button>
            <button onClick={onLogout}>Logout</button>
            {info && (
                <div className="secret-info">
                    <h3>Información:</h3>
                    <p><strong>Usuario:</strong> {info.user}</p>
                    <p><strong>Contraseña:</strong> {info.password}</p>
                    <p><strong>Token:</strong> {info.token}</p>
                </div>
            )}
        </div>
    );
}


ReactDOM.render(<App />, document.getElementById('root'));