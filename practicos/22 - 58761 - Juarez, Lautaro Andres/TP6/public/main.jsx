const { useState } = React;

function UserManagementApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [notification, setNotification] = useState("");

  const registerAccount = async (event) => {
    event.preventDefault();
    const username = document.getElementById("regUsername").value.trim();
    const password = document.getElementById("regPassword").value.trim();
    const confirmPassword = document
      .getElementById("regConfirmPassword")
      .value.trim();

    if (!username || !password || !confirmPassword) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    try {
      const response = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, confirmPassword }),
      });

      const data = await response.json();
      setNotification(data.message);
    } catch (error) {
      setNotification("Hubo un error durante el registro.");
    }
  };

  const loginAccount = async (event) => {
    event.preventDefault();
    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (!username || !password) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      setNotification(data.message);
      if (response.status === 200) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      setNotification("Hubo un error durante el inicio de sesión.");
    }
  };

  const logoutAccount = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/logout", {
        method: "POST",
      });

      const data = await response.json();
      setNotification(data.message);
      if (response.status === 200) {
        setIsAuthenticated(false);
      }
    } catch (error) {
      setNotification("Hubo un error durante el cierre de sesión.");
    }
  };

  const fetchUserDetails = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/info");
      const data = await response.json();
      setNotification(data.message);
    } catch (error) {
      setNotification("Hubo un error al obtener la información.");
    }
  };

  return (
    <div>
      <h1>Gestión de Usuarios</h1>
      <div className="form-container">
        {!isAuthenticated &&
          (!isRegistering ? (
            <div>
              <form onSubmit={loginAccount}>
                <h2>Iniciar Sesión</h2>
                <div>
                  <label htmlFor="loginUsername">Nombre de Usuario:</label>
                  <input
                    type="text"
                    id="loginUsername"
                    placeholder="Nombre de Usuario"
                  />
                </div>
                <div>
                  <label htmlFor="loginPassword">Contraseña:</label>
                  <input
                    type="password"
                    id="loginPassword"
                    placeholder="Contraseña"
                  />
                </div>
                <button type="submit">Iniciar Sesión</button>
              </form>
              <button onClick={() => setIsRegistering(true)}>Registrar</button>
            </div>
          ) : (
            <div>
              <form onSubmit={registerAccount}>
                <h2>Crear Cuenta</h2>
                <div>
                  <label htmlFor="regUsername">Nombre de Usuario:</label>
                  <input
                    type="text"
                    id="regUsername"
                    placeholder="Nombre de Usuario"
                  />
                </div>
                <div>
                  <label htmlFor="regPassword">Contraseña:</label>
                  <input
                    type="password"
                    id="regPassword"
                    placeholder="Contraseña"
                  />
                </div>
                <div>
                  <label htmlFor="regConfirmPassword">
                    Confirmar Contraseña:
                  </label>
                  <input
                    type="password"
                    id="regConfirmPassword"
                    placeholder="Confirmar Contraseña"
                  />
                </div>
                <button type="submit">Registrarse</button>
              </form>
              <button onClick={() => setIsRegistering(false)}>
                Volver al Inicio de Sesión
              </button>
            </div>
          ))}

        {isAuthenticated && (
          <div className="authenticated-actions">
            <form onSubmit={logoutAccount}>
              <h2>Cerrar Sesión</h2>
              <button type="submit">Cerrar Sesión</button>
            </form>
            <form onSubmit={fetchUserDetails}>
              <h2>Detalles del Usuario</h2>
              <button type="submit">Ver Detalles</button>
            </form>
          </div>
        )}
      </div>
      <p>{notification}</p>
    </div>
  );
}

ReactDOM.render(<UserManagementApp />, document.getElementById("root"));
