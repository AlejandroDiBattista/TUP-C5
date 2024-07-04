import express from 'express';
import cookieParser from 'cookie-parser';
import morgan
 from 'morgan';
const app = express();

app.use(morgan('dev'));     // Loggea cada request en consola
app.use(cookieParser());    // Para leer cookies
app.use(express.json());    // Para leer JSONs
app.use(express.static('public'));  // Para servir archivos estáticos

let usuarios = [];

function generarToken() {
    return Math.random().toString().substring(2);
}

function validarUsuario(req, res, next) {
    let token = req.cookies.token;
    let usuario = usuarios.find(u => u.token === token);

    if (usuario) {
        req.usuario = usuario;
        next();
    } else {
        res.status(401).send('Acceso no autorizado');
    }
}

app.post('/registrar', (req, res) => {
    let { user, password } = req.body;

    if (!user || !password) {
        return res.status(400).send('Faltan datos');
    }

    let existe = usuarios.find(u => u.user === user);
    if (existe) {
        return res.status(402).send("El usuario ya existe");
    }

    usuarios.push({ user, password });// Verificar
    res.send('Usuario registrado');
});

app.post('/login', (req, res) => {
    let { user, password } = req.body;

    if (!user || !password) {
        return res.status(400).send('Faltan datos');
    }

    let usuario = usuarios.find(u => u.user === user && u.password === password);
    if (usuario) {
        let token = generarToken();
        usuario.token = token;
        res.cookie('token', token, { httpOnly: true });// Verificar
        return res.send("Usuario logueado");
    }

    res.status(401).send('Usuario o contraseña incorrectos');
});

app.put('/logout', validarUsuario, (req, res) => {
    let usuario = req.usuario;
    delete usuario.token;
    res.send('Usuario deslogueado');
});

app.get('/info', validarUsuario, (req, res) => {
    res.send('Información sensible');
});

app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});