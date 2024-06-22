

const { useState } = React;

const Login = ({ principal, registrando, persona }) => {
    const [user, setUser] = useState({
        usuario: '',
        contraseña: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState, [name]: value
        }));
    };

    const handleRegistrar = async (e) => {
        e.preventDefault();
        registrando(true);
    };

    const handleLoguear = async (e) => {
        e.preventDefault();
        if (!user.usuario || !user.contraseña) {
            alert("Ingrese usuario y contraseña");
        } else {
            try {
                const res = await fetch('./login', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user)
                });
                const data = await res.json();
                const { usuario, contraseña, mensaje, token } = data;
                console.log(data);
                if (mensaje === 'LOGUEADO') {
                    principal(true);
                    persona({ usuario, contraseña, token });
                } else {
                    alert(mensaje);
                }
            } catch (error) {
                console.log(error.message);
            }
        }
    };

    return (
        <div>
            <form>
                <section>
                    <div>
                        <h2>Inicio de sesión</h2>
                        <label>
                            <input type='text' name="usuario" value={user.usuario} onChange={handleChange} placeholder="Usuario" />
                        </label>
                        <label>
                            <input type='password' name="contraseña" value={user.contraseña} onChange={handleChange} placeholder='Contraseña' />
                        </label>
                        <span>
                            <button onClick={handleLoguear}>Ingresar</button>
                            <button onClick={handleRegistrar}>Registrarse</button> {/* Agregado el manejador de eventos */}
                        </span>
                    </div>
                </section>
            </form>
        </div>
    );
};


const Principal = ({ principal }) => {

    const [mostrar, setMostrar] = useState(false);

    const handleInfo = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/info', {
                method: 'PUT',
                credentials: 'include'
            });
            const data = await res.text();
            if (data === 'INFO') {
                setMostrar(true);
            }
        } catch (error) {
            console.error('Error:', error)
        }
    };

    const handleCerrar = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/logout', {
                method: 'PUT',
                credentials: 'include'
            });
            const data = await res.json();
            const { mensaje } = data;
            if (mensaje === 'Usuario deslogueado') {
                principal(false)
            }
        } catch (error) {
            console.error('Error al desloguear:', error)
        }
    };


    return (
        <>
            <div>
                <form>
                    <section>
                        <div>
                            <h2>Bienvenido</h2>
                            {mostrar ?
                                <section>
                                    <label>
                                        <h4>Informacion sensible</h4>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim praesentium odio accusamus corporis deleniti nam, qui dolores, nulla voluptatum illum quia velit minima delectus quam excepturi, fuga molestias autem facere.</p>
                                    </label>
                                </section>
                                :
                                <>
                                    <button onClick={handleInfo}>Mostrar info</button>
                                </>
                            }
                            <button onClick={handleCerrar}>Cerrar sesión</button>
                        </div>
                    </section>
                </form>
            </div>
        </>
    )
}


const Registrar = ({ registrando, principal }) => {

    const [user, setUser] = useState({
        usuario: '',
        contraseña: '',
        comprobar: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState, [name]: value
        }));
    };

    const handleVolver = (e) => {
        e.preventDefault()
        registrando(false)
    }

    const handleRegistrar = async (e) => {
        e.preventDefault();
        if (!user.usuario || !user.contraseña) {
            alert("Rellene los campos");
        } else {
            if (user.comprobar !== user.contraseña) {
                alert("Las contraseñas no coinciden");
            } else {
                try {
                    const res = await fetch('./registrar', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(user)
                    });
                    const data = await res.json();
                    const { mensaje } = data;
                    console.log(data);
                    if (mensaje === 'REGISTRADO') {
                        registrando(false);
                    } else {
                        alert(mensaje);
                    }
                } catch (error) {
                    console.log(error.message);
                }
            }
        };
    }

    return (
        <>
            <div>
                <form>
                    <section>
                        <div>
                            <h2>Registro</h2>
                            <label>
                                <input type='text' name="usuario" value={user.usuario} onChange={handleChange} placeholder="Usuario" />
                            </label>
                            <label>
                                <input type='password' name="contraseña" value={user.contraseña} onChange={handleChange} placeholder='Contraseña' />
                            </label>
                            <label>
                                <input type='password' name="comprobar" value={user.comprobar} onChange={handleChange} placeholder='Repita la contraseña' />
                            </label>
                            <span>
                                <button onClick={handleRegistrar}>Registrarse</button>
                                <button onClick={handleVolver}>Regresar</button>
                            </span>
                        </div>
                    </section>

                </form>
            </div>
        </>
    )


}

function App() {
    const [user, setUser] = useState({})
    const [princi, setPrinci] = useState(false);
    const [registrar, setRegistrar] = useState(false);

    return (<>

        {princi ? (
            < Principal principal={setPrinci} />
        ) : registrar ? (
            < Registrar registrando={setRegistrar} principal={setPrinci} />
        ) : (
            < Login principal={setPrinci} registrando={setRegistrar} persona={setUser} />
        )}

    </>)
}



