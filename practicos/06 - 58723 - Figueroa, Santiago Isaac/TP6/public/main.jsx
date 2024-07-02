function App() {
    const [mensaje, setMensaje] = React.useState('');
    const [usuario, setUsuario] = React.useState('');
    const [contraseña, setContraseña] = React.useState('');
    const [verRegistro, setVerRegistro] = React.useState(false);
    const [verLogin, setVerLogin] = React.useState(true);
    const [verInfo, setVerInfo] = React.useState(false);

    async function registrar(e) {
        e.preventDefault();
        let res = await fetch('/registrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user: usuario, password: contraseña }),
        });
        let data = await res.text();
        setMensaje(data);
        if (res.ok) {
            setUsuario('');  
            setContraseña(''); 
            setVerRegistro(false);
            setVerLogin(true);
        }
    }

    async function login(e) {  // Verificar
        e.preventDefault();
        let res = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user: usuario, password: contraseña }),
        });
        let data = await res.text();
        setMensaje(data);
        if (res.ok) {
            setUsuario(''); 
            setContraseña('');   
            setVerLogin(false);  
            setVerInfo(true);  
        }
    }

    async function logout() {
        let res = await fetch('/logout', {
            method: 'PUT',
            credentials: 'include',
        });
        let data = await res.text();
        setMensaje(data);
        setVerInfo(false);
        setVerLogin(true);
    }

    async function info() {
        let res = await fetch('/info', {
            method: 'GET',
            credentials: 'include',
        });
        let data = await res.text();
        setMensaje(data);
    }

    return (
        <div>
            <h1>TP6 - Sesiones</h1>

            {verLogin && (
                <form className="formlogin" onSubmit={login} autoComplete="off">
                    <h2>Login</h2>
                    <input
                        type="text"
                        placeholder="Usuario"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        autoComplete="username"
                    />
                    <input className="contraseña"
                        type="password"
                        placeholder="Contraseña"
                        value={contraseña}
                        onChange={(e) => setContraseña(e.target.value)}
                        autoComplete="current-password"
                    />
                    <button type="submit">Login</button>
                    <button className="ash" onClick={() => {setVerRegistro(true); setVerLogin(false);}}>Crear cuenta</button>
                    <pre>{mensaje}</pre>
                </form>
            )}

            {verRegistro && (
                <form className="formregister" onSubmit={registrar} autoComplete="off">
                    <h2>Registrar</h2>
                    <input
                        type="text"
                        placeholder="Usuario"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        autoComplete="new-username"
                    />
                    <input className="xd"
                        type="password" 
                        placeholder="Contraseña"
                        value={contraseña}
                        onChange={(e) => setContraseña(e.target.value)}
                        autoComplete="new-password"
                    />
                    <button type="submit">Registrar</button>
                    <button className="ash" onClick={() => {setVerRegistro(false);setVerLogin(true);}}>Cancelar</button>
                    <pre>{mensaje}</pre>
                </form>
            )}

            {verInfo && (
                <div>
                    <button onClick={info}>Info</button>
                    <button className="ash" onClick={logout}>Logout</button>
                    <pre>{mensaje}</pre>
                    
                </div>
            )}
        </div>
    );
}
