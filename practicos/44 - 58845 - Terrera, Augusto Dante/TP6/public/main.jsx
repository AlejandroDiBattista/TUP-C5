const { useState } = React

const Login = ({ onLogin }) => {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [mostrar, setMostrar] = useState(false)


    const ingresar = async (e) => {
        e.preventDefault()
        if (!user || !password) {
            alert('Todos los campos son obligatorios')
            return
        }
        else {
            try {
                const res = await fetch('http://localhost:3000/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        user: user,
                        password: password
                    })
                })
                const data = await res.json();
                if (data) {
                    onLogin(data);
                } else {
                    alert('Usuario o contraseña incorrecta');
                }
            } catch (error) {
                alert('Error al conectar con el servidor')
            }
        }
    }

    const registrar = (e) => {
        e.preventDefault()
        setMostrar(true)
    }


    return (
        <>
            {mostrar
                ?
                <Registrar />
                :
                <div>
                    <h1>Login</h1>
                    <form>
                        <input type="text" placeholder="Username" onChange={(e) => setUser(e.target.value)} />
                        <br />
                        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        <br />
                        <button onClick={ingresar}>Ingresar</button>
                        <button onClick={registrar}>Registrar</button>
                    </form>
                </div>
            }
        </>
    )
}

const Registrar = () => {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [rPassword, setRPassword] = useState('')
    const [mostrar, setMostrar] = useState(false)

    const registrarse = async (e) => {
        e.preventDefault()
        if (!user || !password ) {
            alert('Todos los campos son necesarios!')
            return
        }
        else if (password.length < 4 || rPassword.length < 4) {
            alert('La contraseña debe tener al menos 8 caracteres')
            return
        }
        else if (rPassword != password) {
            alert('Las contraseñas no coinciden')
            return
        }
        else {
            try {
                const res = await fetch('http://localhost:3000/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ user, password })
                });
                const data = await res.json()
                if (res.status === 201) {
                    alert('Usuario registrado con éxito')
                    setMostrar(true)
                } else {
                    alert('Error al registrar usuario: ')
                }
            } catch (error) {
                alert('Error al conectar con el servidor')
            }
        }
    }

    return (
        <>
            {mostrar
                ?
                <Login />
                :
                <div>
                    <h1>Registrar</h1>
                    <form>
                        <input type="text" placeholder="Usuario" onChange={(e) => setUser(e.target.value)} />
                        <br />
                        <input type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} />
                        <br />
                        <input type="password" placeholder="Repetir contraseña" onChange={(e) => setRPassword(e.target.value)} />
                        <br />
                        <button onClick={registrarse}>Registrarse</button>
                    </form>
                </div>
            }
        </>
    )
}

function App() {
    const [authenticated, setAuthenticated] = useState(false)
    const [user, setUser] = useState(null)

    const handleLogin = (userData) => {
        setUser(userData)
        setAuthenticated(true)
    }
    const logout = async () => {
        try {
            const res = await fetch('http://localhost:3000/logout', {
                method: 'PUT',
                credentials: 'include'
            });
            if (res.ok) {
                setUser(null);
                setAuthenticated(false);
                alert('Usuario deslogueado');
            } else {
                alert('Error al cerrar sesión');
            }
        } catch (error) {
            alert('Error al conectar con el servidor');
        }
    };

    return (
        <div>
            {authenticated
                ? <div>
                    <h1>Bienvenido, {user.user}</h1>
                    <p>Token: {user.token}</p>
                    <button onClick={logout}>Cerrar Sesion</button>
                </div>
                : <Login onLogin={handleLogin} />
            }
        </div>
    )
}
