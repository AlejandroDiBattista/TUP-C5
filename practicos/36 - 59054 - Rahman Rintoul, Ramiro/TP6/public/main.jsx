const { useState } = React

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [message, setMessage] = useState('')

    const handleRegister = async () => {
        const email = document.getElementById('email').value.trim()
        const username = document.getElementById('nombreRegistro').value.trim()
        const password = document.getElementById('ContraseñaRegistro').value.trim()
        const rePassword = document.getElementById('reContraseña').value.trim()

        if (!email || !username || !password || !rePassword) {
            alert('Todos los campos son obligatorios.')
            return
        }

        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, username, password, rePassword })
        })
        const data = await response.json()
        setMessage(data.message)
    }

    const handleLogin = async () => {
        const username = document.getElementById('nombreInicio').value.trim()
        const password = document.getElementById('ContraseñaInicio').value.trim()

        if (!username || !password) {
            alert('Todos los campos son obligatorios.')
            return
        }

        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        const data = await response.json()
        setMessage(data.message)
        if (response.status === 200) {
            setIsLoggedIn(true)
        }
    }

    const handleLogout = async () => { 
        const response = await fetch('/logout', {
            method: 'POST'
        })
        const data = await response.json()
        setMessage(data.message)
        if (response.status === 200) {
            setIsLoggedIn(false)
        }
    }

    const fetchInfo = async () => {
        const response = await fetch('/info')
        const data = await response.json()
        setMessage(data.message)
    }

    return (
        <>
            {!isLoggedIn ? (
                <div className="Inicio">
                    <img className="userIcon" src="https://cdn-icons-png.flaticon.com/512/5264/5264565.png" alt="" />
                    <h1>Inicio de Sesión</h1>
                    <input type="text" id="nombreInicio" placeholder="Nombre de Usuario" />
                    <input type="password" id="ContraseñaInicio" placeholder="Contraseña" />
                    <button onClick={handleLogin}>Iniciar Sesión</button>
                    <h4>¿No tiene una cuenta? Haga click <button className="registrarse" onClick={() => {
                        document.querySelector('.Registro').style.display = 'flex'
                        document.querySelector('.Inicio').style.display = 'none'
                    }}>Aqui</button> Para registrarse</h4>
                </div>
            ) : (
                <div>
                    <h1>Bienvenido</h1>
                    <button onClick={fetchInfo}>Ver Información</button>
                    <button onClick={handleLogout}>Cerrar Sesión</button>
                </div>
            )}
            <div className="Registro">
                <h1>Formulario de Registro</h1>
                <input type="text" id="email" placeholder="Email" />
                <input type="text" id="nombreRegistro" placeholder="Nombre de Usuario" />
                <input type="password" id="ContraseñaRegistro" placeholder="Contraseña" />
                <input type="password" id="reContraseña" placeholder="Repetir Contraseña" />
                <button onClick={handleRegister}>Registrarse</button>
                <h4>¿Ya tienes una cuenta? inicia sesión <button className="VolverInicio"
                    onClick={() => {
                        document.querySelector('.Registro').style.display = 'none'
                        document.querySelector('.Inicio').style.display = 'flex'
                    }}>Aqui</button>  </h4>
            </div>
            <p>{message}</p>
        </>
    )
}

