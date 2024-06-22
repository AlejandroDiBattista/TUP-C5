import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));

let usuarios = [];

function validarUsuario(req, res, next) {
  let idUsuario = req.cookies.idUsuario;
  let usuario = usuarios.find(u => u.idUsuario === idUsuario);

  if (usuario) {
    req.usuario = usuario;
    next();
  } else {
    res.status(401).send('Acceso no autorizado. Por favor inicia sesión.');
  }
}

function generarIdUsuario() {
  return Math.random().toString().substring(2);
}

app.post('/registrar', (req, res) => {
  let { usuario, contraseña, email, celular } = req.body;

  if (!usuario || !contraseña || !email || !celular) {
    return res.status(400).send('Completa todos los campos para registrarte.');
  }

  let existeUsuario = usuarios.find(u => u.usuario === usuario);
  if (existeUsuario) {
    return res.status(402).send('El usuario ya existe.');
  }

  usuarios.push({ usuario, contraseña, email, celular });
  res.send('¡Registro exitoso! Ahora puedes iniciar sesión.');
});

app.post('/iniciar-sesion', (req, res) => {
  let { usuario, contraseña } = req.body;

  if (!usuario || !contraseña) {
    return res.status(400).send('Por favor ingresa tu nombre de usuario y contraseña.');
  }

  let usuarioEncontrado = usuarios.find(u => u.usuario === usuario && u.contraseña === contraseña);
  if (usuarioEncontrado) {
    let idUsuario = generarIdUsuario();
    usuarioEncontrado.idUsuario = idUsuario;
    res.cookie('idUsuario', idUsuario, { httpOnly: true });
    return res.send(`¡Bienvenido otra vez!`);
  }

  res.status(401).send('Usuario y/o contraseña incorrectos. Por favor intenta nuevamente.');
});

app.put('/cerrar-sesion', validarUsuario, (req, res) => {
  let usuario = req.usuario;
  delete usuario.idUsuario;
  res.clearCookie('idUsuario');
  res.send('Sesión cerrada.');
});

app.get('/info', validarUsuario, (req, res) => {
  let usuario = req.usuario;
  res.json({ usuario: usuario.usuario, email: usuario.email, celular: usuario.celular });
});

app.listen(3000, () => {
  console.log('Servidor iniciado en http://localhost:3000');
});
