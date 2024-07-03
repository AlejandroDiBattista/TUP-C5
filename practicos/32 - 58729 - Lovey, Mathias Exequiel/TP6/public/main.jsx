function App() {
    const [mensaje, setMensaje] = React.useState('');
    const [user, setUser] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loginUser, setLoginUser] = React.useState('');
    const [loginPassword, setLoginPassword] = React.useState('');
    const [showRegister, setShowRegister] = React.useState(false);
    const [showLogin, setShowLogin] = React.useState(false);

    async function registrar(e) {
        e.preventDefault();
        let res = await fetch('/registrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user, password }),
        });
        let data = await res.text();
        alert(data);
        if (res.ok) {
            setUser('');
            setPassword('');
            setShowRegister(false);
        }
    }

    async function login(e) {  // Verificar
        e.preventDefault();
        let res = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user: loginUser, password: loginPassword }),
        });
        let data = await res.text();
        alert(data);
        if (res.ok) {
			setShowLogin(false); // Verificar
		}
    }

    async function logout() {
        let res = await fetch('/logout', {
            method: 'PUT',
            credentials: 'include',
        });
        let data = await res.text();
        alert(data);
        if (res.ok) {
            setLoginUser('');
            setLoginPassword('');
        }
    }

    async function info() {
        let res = await fetch('/info', {
            method: 'GET',
            credentials: 'include',
        });

        if (res.ok) {
            alert('Usuario logueado');
        } else {
            alert('Usuario no encontrado');
        }
    }

    return (
        <div className="container">
            <h1 className="title">Registros</h1>
            <button className="btnAccion" onClick={() => setShowRegister(!showRegister)}>Registrar</button>
            <button className="btnAccion" onClick={() => setShowLogin(!showLogin)}>Login</button>
            <button className="btnAccion" onClick={logout}>Logout</button>
            <button className="btnAccion" onClick={info}>Info</button>

            {showRegister && (
                <form onSubmit={registrar} autoComplete="off">
                    <h2>Registrar</h2>
                    <input className="inputBtn" type="text" placeholder="Usuario" value={user} onChange={(e) => setUser(e.target.value)} autoComplete="new-username"/>
                    <input className="inputBtn" type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password"/>
                    <button type="submit">Registrar</button>
                </form>
            )}

            {showLogin && (
                <form onSubmit={login} autoComplete="off">
                    <h2>Login</h2>
                    <input className="inputBtn" type="text" placeholder="Usuario" value={loginUser} onChange={(e) => setLoginUser(e.target.value)} autoComplete="username"/>
                    <input className="inputBtn" type="password" placeholder="Contraseña" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} autoComplete="current-password"/>
                    <button type="submit">Login</button>
                </form>
            )}
            <pre>{mensaje}</pre>
        </div>
    );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);