import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev')); 
app.use(cookieParser()); 
app.use(express.json()); 
app.use(express.static('public')); 

let usuarios = [];


function validaUsuario(req, res, next) {
  let id = req.cookies.id;
  let usuario = usuarios.find(u => u.id === id);

  if (usuario) {
    req.usuario = usuario;
    next();
  } else {
    res.status(401).send('Acceso no autorizado. Por favor inicia sesión.');
  }
}


function generarId() {
  return Math.random().toString().substring(2);
}


app.post('/registrar', (req, res) => {
  let { user, password } = req.body;

  if (!user || !password) {
    return res.status(400).send('Completa todos los campos para registrarte.');
  }

  let existe = usuarios.find(u => u.user === user);
  if (existe) {
    return res.status(402).send("El usuario ya existe. Prueba con otro nombre de usuario.");
  }

  usuarios.push({ user, password });
  res.send('¡Registro exitoso! Ahora puedes iniciar sesión.');
});


app.post('/login', (req, res) => {
  let { user, password } = req.body;

  if (!user || !password) {
    return res.status(400).send('Por favor ingresa tu nombre de usuario y contraseña.');
  }

  let usuario = usuarios.find(u => u.user === user && u.password === password);
  if (usuario) {
    let id = generarId();
    usuario.id = id;
    res.cookie('id', id, { httpOnly: true });
    return res.send("¡Bienvenido de vuelta! Has iniciado sesión correctamente.");
  }

  res.status(401).send('Usuario y/o contraseña incorrectos. Por favor intenta nuevamente.');
});


app.put('/logout', validaUsuario, (req, res) => {
  let usuario = req.usuario;
  delete usuario.id;
  res.send('Has cerrado sesión correctamente.');
});


app.get('/info', validaUsuario, (req, res) => {
  let usuario = req.usuario;
  res.send(`Bienvenido ${usuario.user}! Estás logueado.`);
});

app.listen(3000, () => {
  console.log('Servidor iniciado en http://localhost:3000');
});
