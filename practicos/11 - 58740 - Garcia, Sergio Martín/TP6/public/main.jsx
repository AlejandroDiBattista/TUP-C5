function App() {
    let [mensaje, setMensaje] = React.useState('')
    let [user, setUser] = React.useState('')
    let [password, setPassword] = React.useState('')
    let [showRegistro, setShowRegistro] = React.useState(true)
    let [showLogin, setShowLogin] = React.useState(false)
    let [showInfo, setShowInfo] = React.useState(false)
    let [loginUser, setLoginUser] = React.useState('')
    let [loginPassword, setLoginPassword] = React.useState('')

    async function registro(e) {
        e.preventDefault()
        let res = await fetch('/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user, password })
        });
        let data = await res.text()
        setMensaje(data)
        if (res.ok) {
            setUser('');
            setPassword('');
            setShowLogin(true);
            setShowRegistro(false);
        }
    }

    async function login(e) {
        e.preventDefault()
        let res = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user: loginUser, password: loginPassword })
        });
        let data = await res.text();
        setMensaje(data.mensaje);
        if (res.ok) {
            setShowLogin(false);
            setShowInfo(true);
        }
    }

    async function info() {
        let res = await fetch('/privado', {
            method: 'GET',
            credentials: 'include',
        })
        let data = await res.text();
        setMensaje(data);

    }

    async function logout() {
        let res = await fetch('/logout', {
            method: 'PUT',
            credentials: 'include',
        })
        let data = await res.text();
        setMensaje(data.mensaje);
        setShowInfo(false);
        setShowLogin(true);
    }

    return (
        <div>
            <h1>TP6 - Sesiones</h1>

            {showRegistro && (
                <form >
                    <h2>Registro</h2>
                    <section>
                        <label >Crear Nombre de Usuario</label>
                        <input type="text" placeholder="Usuario" value={user} onChange={(e) => setUser(e.target.value)} /> <br />

                        <label >Contraseña</label>
                        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} /> <br />


                        <span>
                            <button type="button" onClick={registro}>Registrarse</button><br /><br />
                            <button type="button" onClick={() => { setShowRegistro(false); setShowLogin(true); }}>Ya tengo cuenta</button>
                        </span>
                    </section>
                </form>

            )}

            {showLogin && (
                <form >
                    <h2>Login</h2>
                    <section>
                        <label>Nombre de Usuario</label>
                        <input type="text" placeholder="Usuario" value={loginUser} onChange={(e) => setLoginUser(e.target.value)} /><br />

                        <label>Contraseña</label>
                        <input type="password" placeholder="Contraseña" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} /><br />

                        <span>
                            <button onClick={login}>Iniciar sesión</button><br /><br />
                            <button onClick={() => { setShowRegistro(true); setShowLogin(false); }}>Registrarse</button>
                        </span>
                    </section>
                </form>
            )}

            {showInfo && (
                <div>
                    <h2>Información privada</h2>
                    <button onClick={info}>Ver información</button><br /><br />
                    <button onClick={logout}>Cerrar sesión</button>
                </div>
            )}

            <pre>{mensaje}</pre>

        </div>
    )
}