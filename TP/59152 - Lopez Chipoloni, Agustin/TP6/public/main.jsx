
function App() {
  const [mensaje, setMensaje] = useState('');
  const [formData, setFormData] = useState({usuario: '', contraseña: '', email: '', celular: ''});
  const [registro, setRegistro] = useState(false);
  const [logueado, setLogueado] = useState(false);
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [usuarioInfo, setUsuarioInfo] = useState({});

  const validarCampos = () => {
    if (!formData.usuario || !formData.contraseña || (registro && (!formData.email || !formData.celular))) {
    setMensaje('Por favor completa todos los campos.');
    return false;
    }
    return true;
  };

  const manejarSubmit = async (e) => {
  e.preventDefault();
  if (!validarCampos()) return;
  const endpoint = registro ? '/registrar' : '/iniciar-sesion';
  try {
  const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData),});
  const data = await res.text();
  setMensaje(data);
  if (res.ok) { setFormData({ usuario: '', contraseña: '', email: '', celular: '' });
   if (!registro) {
   setLogueado(true);
      setNombreUsuario(formData.usuario);
    }}
    } catch (error) {
      console.error(`Error al ${registro ? 'registrar' : 'iniciar sesión'}:`, error);
      setMensaje(`Error al ${registro ? 'registrar' : 'iniciar sesión'}`);
    }
  };
  const cerrarSesion = async () => {
    try {
    const res = await fetch('/cerrar-sesion', { method: 'PUT', credentials: 'include' });
    const data = await res.text();
    setMensaje(data);
    if (res.ok) {
    setFormData({ usuario: '', contraseña: '', email: '', celular: '' });
    setLogueado(false);
    setNombreUsuario('');
    setUsuarioInfo({});
  }
  } catch (error) {console.error('Error al cerrar sesión:', error); setMensaje('Error al cerrar sesión');}
  };
  const obtenerInfoUsuario = async () => {
  try {
  const res = await fetch('/info', { method: 'GET', credentials: 'include' });
  if (res.ok) {
  const data = await res.json();
  setUsuarioInfo(data);
} else {
  setUsuarioInfo({});
  }
  } catch (error) {
  console.error('Error al obtener información del usuario:', error);
  setUsuarioInfo({});
    }
  };
  const obtenerInfo = async () => {
    try {
    const res = await fetch('/info', { method: 'GET', credentials: 'include' });
    if (res.ok) {
    const data = await res.json();
    setMensaje('Información del usuario obtenida correctamente');
    setUsuarioInfo(data);
    } else {
    setMensaje('¡Usuario no encontrado!');
    }
   } catch (error) {
  console.error('Error al obtener información:', error);
  setMensaje('Error al obtener información');
  }
  };

  return (
  <div className="container">
  {logueado ? (
  <>
  <button className="btns" onClick={cerrarSesion}>Cerrar Sesión</button>
  <button className="btns" onClick={obtenerInfo}>Mensaje</button>
  {usuarioInfo.usuario && (
  <div className="usuario-info">
  <h3>Información del Usuario</h3>
  <p><strong>Nombre de usuario:</strong> {usuarioInfo.usuario}</p>
  <p><strong>Email:</strong> {usuarioInfo.email}</p>
  <p><strong>Número de Celular:</strong> {usuarioInfo.celular}</p>
  </div>
  )}
  </>
  ) : (
  <>
  <form onSubmit={manejarSubmit} autoComplete="off">
  <h2 className="hder">{registro ? 'Registrar' : 'Iniciar Sesión'}</h2>
  <input className="input" type="text" placeholder="Usuario" value={formData.usuario}onChange={(e) => setFormData({ ...formData, usuario: e.target.value })}autoComplete="username"/>
  <input className="input" type="password" placeholder="Contraseña"value={formData.contraseña}onChange={(e) => setFormData({ ...formData, contraseña: e.target.value })}autoComplete={registro ? 'new-password' : 'current-password'}/>
  {registro && (
  <>
  <input className="input" type="email" placeholder="Correo Electrónico"value={formData.email}onChange={(e) => setFormData({ ...formData, email: e.target.value })}/>
  <input className="input" type="tel"placeholder="Número de Celular" value={formData.celular}onChange={(e) => setFormData({ ...formData, celular: e.target.value })}/>
  </>
   )}
  <button type="submit" className="btns">{registro ? 'Registrar' : 'Iniciar Sesión'}</button>
  </form>
  <button className="btns2" onClick={() => setRegistro(!registro)}>{registro ? 'Iniciar Sesión' : 'Registrarse'}</button>
  </>
  )}
  <div id="mensaje">{mensaje}</div>
  </div>
  );
}

