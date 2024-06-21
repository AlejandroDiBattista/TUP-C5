function App() {
  const [formRegistro, setFormRegistro] = useState({
    nombreUsuario: "",
    clave: "",
  });
  const [formLogin, setFormLogin] = useState({ nombreUsuario: "", clave: "" });
  const [estadoSesion, setEstadoSesion] = useState(false);
  const [mensajeError, setMensajeError] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");
  const [mensajeInfo, setMensajeInfo] = useState({
    mensaje: "",
    nombreUsuario: "",
  });

  const cambioRegistro = (e) => {
    const { name, value } = e.target;
    setFormRegistro({ ...formRegistro, [name]: value });
    console.log(name, value);
  };

  const cambioLogin = (e) => {
    const { name, value } = e.target;
    setFormLogin({ ...formLogin, [name]: value });
    console.log(name, value);
  };

  const registrarUsuario = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formRegistro),
      });
      const data = await response.json();
      if (data.ok) {
        setMensajeExito(data.mensaje);
        setMensajeError("");
      } else {
        setMensajeError(data.mensaje);
        setMensajeExito("");
      }
    } catch (error) {
      console.error("Error al registrar usuario:", error);
    }
  };

  const iniciarSesionUsuario = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/iniciarSes", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formLogin),
      });
      const data = await response.json();
      console.log(data);
      if (data.ok) {
        setEstadoSesion(true);
        setMensajeExito(data.mensaje);
        setMensajeError("");
      } else {
        setMensajeError(data.mensaje);
        setMensajeExito("");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  const obtenerInfoUsuario = async () => {
    try {
      const response = await fetch("/informacion", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      console.log(data);
      if (data.ok) {
        const infoNueva = {
          mensaje: data.mensaje,
          nombreUsuario: data.nombreUsuario,
        };
        setMensajeInfo(infoNueva);
      } else {
        setMensajeError(data.mensaje);
        setMensajeExito("");
      }
    } catch (error) {
      console.error("Error al obtener información del usuario:", error);
    }
  };

  const cerrarSesionUsuario = async () => {
    try {
      const response = await fetch("/cerrarSes", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (data.ok) {
        setEstadoSesion(false);
        setMensajeExito(data.mensaje);
        setMensajeError("");
      } else {
        setMensajeError(data.mensaje);
        setMensajeExito("");
      }
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  return (
    <div className="contenedor-formularios">
      <h1 className="h1-tp6">¡Bienvenido!</h1>
      <div className="contenedor-formularios-seccion-uno">
        <div className="form-registro">
          <h2 className="h2-form">Registro</h2>
          <form className="form" onSubmit={registrarUsuario}>
            <input
              type="text"
              name="nombreUsuario"
              placeholder="Usuario"
              className="input"
              value={formRegistro.nombreUsuario}
              onChange={cambioRegistro}
            />
            <input
              type="password"
              name="clave"
              placeholder="Contraseña"
              className="input"
              value={formRegistro.clave}
              onChange={cambioRegistro}
            />
            <button type="submit" className="button-registro">
              Registrar
            </button>
          </form>
        </div>
        <div className="form-login">
          <h2 className="h2-form">Iniciar Sesión</h2>
          <form className="form" onSubmit={iniciarSesionUsuario}>
            <img src="" alt="" />
            <input
              type="text"
              name="nombreUsuario"
              placeholder="Usuario"
              className="input"
              value={formLogin.nombreUsuario}
              onChange={cambioLogin}
            />
            <input
              type="password"
              name="clave"
              placeholder="Contraseña"
              className="input"
              value={formLogin.clave}
              onChange={cambioLogin}
            />
            <button type="submit" className="button-login">
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
      {!estadoSesion ? (
        <div className="contenedor-formularios-seccion-dos">
          <div className="mensajes">
            <p className="msj-error">{mensajeError}</p>
            <p className="msj-exito">{mensajeExito}</p>
          </div>
          <div className="info-usuario-logeado">
            <p className="p-info-usuario-logeado">¡Adelante!</p>
          </div>
        </div>
      ) : (
        <div className="contenedor-formularios-seccion-dos">
          <div className="mensajes">
            <p className="msj-error">{mensajeError}</p>
            <p className="msj-exito">{mensajeExito}</p>
          </div>
          <div className="info-usuario-logeado">
            <p className="p-info-usuario-logeado">
              {mensajeInfo.mensaje + " " + mensajeInfo.nombreUsuario}
            </p>
          </div>
          <div className="contenedor-botones-usuario-logeado">
            <button className="btn-ver-info" onClick={obtenerInfoUsuario}>
              Ver informacion
            </button>
            <button className="btn-cerrar-sesion" onClick={cerrarSesionUsuario}>
              Cerrar Sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
