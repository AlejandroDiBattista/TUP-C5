const { useState } = React;

function Register({ onRegister, goToLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister(username, password);
        goToLogin();
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Registrarse</h2>
            <label>
                Usuario:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </label>
            <label>
                Contraseña:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label>
            <button type="submit">Registrar</button>
        </form>
    );
}

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(username, password);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Iniciar sesión</h2>
            <label>
                Usuario:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </label>
            <label>
                Contraseña:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label>
            <button type="submit">Ingresar</button>
        </form>
    );
}

function Logout({ onLogout }) {
    return (
        <button onClick={onLogout}>Cerrar sesión</button>
    );
}

function UserInfo({ username }) {
    const handleShowUserInfo = () => {
        alert(`${username} se encuentra logueado`);
    };

    return (
        <button onClick={handleShowUserInfo}>Mostrar información de usuario</button>
    );
}

function ProtectedPage() {
    return (
        <div>
            <h2>Información Protegida</h2>
            <p>Solo puedes ver esta información si estás logueado.</p>
        </div>
    );
}

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [view, setView] = useState('initial'); // 'initial', 'login', 'register', 'protected'

    const handleRegister = async (username, password) => {
        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            alert(data.message);
        } catch (error) {
            console.error('Error al registrar usuario:', error);
        }
    };

    const handleLogin = async (username, password) => {
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (response.ok) {
                setIsLoggedIn(true);
                setUsername(username);
                setView('protected');
            }
            alert(data.message);
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    };

    const handleLogout = async () => {
        try {
            const response = await fetch('/logout', {
                method: 'POST',
            });
            const data = await response.json();
            if (response.ok) {
                setIsLoggedIn(false);
                setUsername('');
                setView('initial');
            }
            alert(data.message);
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <div>
            <h1>Sesiones</h1>
            {view === 'initial' && (
                <div>
                    <button onClick={() => setView('login')}>Ingresar</button>
                    <button onClick={() => setView('register')}>Registrarse</button>
                </div>
            )}
            {view === 'login' && (
                <Login onLogin={handleLogin} />
            )}
            {view === 'register' && (
                <Register onRegister={handleRegister} goToLogin={() => setView('login')} />
            )}
            {view === 'protected' && isLoggedIn && (
                <>
                    <UserInfo username={username} />
                    <ProtectedPage />
                    <Logout onLogout={handleLogout} />
                </>
            )}
        </div>
    );
}

// Renderizar la aplicación
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

