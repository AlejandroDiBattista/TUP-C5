function App() {
    const [user, setUser] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loginUser, setLoginUser] = React.useState('');
    const [loginPassword, setLoginPassword] = React.useState('');
    const [showRegister, setShowRegister] = React.useState(false);
    const [showLogin, setShowLogin] = React.useState(false);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    React.useEffect(() => {
        async function checkLoginStatus() {
            let res = await fetch('/info', {
                method: 'GET',
                credentials: 'include',
            });
            if (res.ok) {
                setIsLoggedIn(true);
            }
        }
        checkLoginStatus();
    }, []);

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
            setShowLogin(true);
        }
    }

    async function login(e) {
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
            setShowLogin(false);
            setIsLoggedIn(true);
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
            setIsLoggedIn(false);
        }
    }

    async function info() {
        let res = await fetch('/info', {
            method: 'GET',
            credentials: 'include',
        });

        if (res.ok) {
            alert('Inicio exitoso');
        } else {
            alert('Credenciales incorrectas');
        }
    }

    return (
        <div class="wrapper">
        <form class="form" onsubmit="return login()">
            <h1 class="title">Inicio</h1>
            <div class="inp">
                <input type="text" id="username" class="input" placeholder="Usuario"></input>
                <i class="fas fa-user"></i>
            </div>
            <div class="inp">
                <input type="password" id="password" class="input" placeholder="Contraseña"></input>
                <i class="fas fa-lock"></i>
            </div>
            <button type="submit" class="submit">Iniciar Sesión</button>
            <p class="footer">No tienes cuenta? <a href="#" class="link" onclick="agregarUsuario()">Por favor, registrarse</a></p>
        </form>
        <div></div>
        <div class="banner">
            <h1 class="wel_text">BIENVENIDO</h1>
        </div>
    </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
