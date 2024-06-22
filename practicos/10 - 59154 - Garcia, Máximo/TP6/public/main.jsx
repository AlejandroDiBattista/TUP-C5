function App() {
  const [mensaje, setMensaje] = useState("");
  const [formData, setFormData] = useState({ usuario: "", contraseña: "" });
  const [registro, setRegistro] = useState(false);
  const [logueado, setLogueado] = useState(false);
  const [nombreUsuario, setNombreUsuario] = useState("");

  function validarCampos() {
    if (!formData.usuario || !formData.contraseña) {
      setMensaje("Por favor completa todos los campos.");
      return false;
    }
    return true;
  }

  async function manejarSubmit(e) {
    e.preventDefault();
    if (!validarCampos()) return;

    const endpoint = registro ? "/registrar" : "/login";
    try {
      let res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: formData.usuario,
          password: formData.contraseña,
        }),
      });
      let data = await res.text();
      setMensaje(data);
      if (res.ok) {
        setFormData({ usuario: "", contraseña: "" });
        if (registro) {
          setRegistro(false);
        } else {
          setLogueado(true);
          setNombreUsuario(formData.usuario);
        }
      }
    } catch (error) {
      console.error(
        `Error al ${registro ? "registrar" : "iniciar sesión"}:`,
        error
      );
      setMensaje(`Error al ${registro ? "registrar" : "iniciar sesión"}`);
    }
  }

  async function cerrarSesion() {
    try {
      let res = await fetch("/logout", {
        method: "PUT",
        credentials: "include",
      });
      let data = await res.text();
      setMensaje(data);
      if (res.ok) {
        setFormData({ usuario: "", contraseña: "" });
        setLogueado(false);
        setNombreUsuario("");
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      setMensaje("Error al cerrar sesión");
    }
  }

  async function obtenerInfo() {
    try {
      let res = await fetch("/info", {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        setMensaje(`Bienvenido ${nombreUsuario}! Estás logueado.`);
      } else {
        setMensaje("¡Usuario no encontrado!");
      }
    } catch (error) {
      console.error("Error al obtener información:", error);
      setMensaje("Error al obtener información");
    }
  }

  return (
    <div className="container">
      {logueado ? (
        <>
          <button className="btns" onClick={cerrarSesion}>
            Cerrar Sesión
          </button>
          <button className="btns" onClick={obtenerInfo}>
            Mensaje
          </button>
        </>
      ) : (
        <>
          <form onSubmit={manejarSubmit} autoComplete="off">
            <h2 className="hder">
              {registro ? "Registrar" : "Iniciar Sesión"}
            </h2>
            <input
              className="input"
              type="text"
              placeholder="Usuario"
              value={formData.usuario}
              onChange={(e) =>
                setFormData({ ...formData, usuario: e.target.value })
              }
              autoComplete="username"
            />
            <input
              className="input"
              type="password"
              placeholder="Contraseña"
              value={formData.contraseña}
              onChange={(e) =>
                setFormData({ ...formData, contraseña: e.target.value })
              }
              autoComplete={registro ? "new-password" : "current-password"}
            />
            <button type="submit" className="btns">
              {registro ? "Registrar" : "Iniciar Sesión"}
            </button>
          </form>
          <button className="btns2" onClick={() => setRegistro(!registro)}>
            {registro ? "Iniciar Sesión" : "Registrarse"}
          </button>
        </>
      )}

      <div id="mensaje">{mensaje}</div>
    </div>
  );
}
