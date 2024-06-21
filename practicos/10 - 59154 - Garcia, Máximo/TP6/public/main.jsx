function App() {
  const [mensaje, setMensaje] = useState("");
  const [formData, setFormData] = useState({ usuario: "", contraseña: "" });
  const [esRegistro, setEsRegistro] = useState(false);
  function validarCampos() {
    if (!formData.usuario || !formData.contraseña) {
      setMensaje("Todos los campos son obligatorios.");
      return false;
    }
    return true;
  }
  async function manejarSubmit(e) {
    e.preventDefault();
    if (!validarCampos()) return;

    const endpoint = esRegistro ? "/registrar" : "/login";
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
        if (esRegistro) setEsRegistro(false);
      }
    } catch (error) {
      console.error(
        `Error al ${esRegistro ? "registrar" : "iniciar sesión"}:`,
        error
      );
      setMensaje(`Error al ${esRegistro ? "registrar" : "iniciar sesión"}`);
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
        alert("Usuario logueado");
      } else {
        alert("Usuario no encontrado");
      }
    } catch (error) {
      console.error("Error al obtener información:", error);
      setMensaje("Error al obtener información");
    }
  }
  return (
    <div className="container">
      <h1 className="hder">Acciones</h1>
      <button className="btns" onClick={() => setEsRegistro(!esRegistro)}>
        {esRegistro ? "Iniciar Sesión" : "Registrarse"}
      </button>
      <button className="btns" onClick={cerrarSesion}>
        Cerrar sesion
      </button>
      <button className="btns" onClick={obtenerInfo}>
        Informacion
      </button>

      <form onSubmit={manejarSubmit} autoComplete="off">
        <h2>{esRegistro ? "Registrar" : "Iniciar Sesión"}</h2>
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
          autoComplete={esRegistro ? "new-password" : "current-password"}
        />
        <button type="submit">
          {esRegistro ? "Registrar" : "Iniciar Sesión"}
        </button>
      </form>

      <pre>{mensaje}</pre>
    </div>
  );
}
