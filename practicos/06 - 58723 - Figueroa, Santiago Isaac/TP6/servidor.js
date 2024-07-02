import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
const app = express();

app.use(morgan('dev'));     // Loggea cada request en consola
app.use(cookieParser());    // Para leer cookies
app.use(express.json());    // Para leer JSONs
app.use(express.static('public'));  // Para servir archivos estáticos

let usuarios = [];

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

function generarToken() {
    return Math.random().toString().substring(2);
}

const registrarUsuario = (req, res) => {
    let { user, password } = req.body 

    if (!user || !password) {
        res.status(400).send('Faltan datos');
    } else {
        let existe = usuarios.find(u => u.user === user);
        if (existe) {
            res.status(402)
            res.send("El usuario ya existe")
        } else {
            usuarios.push({ user, password })
            res.send('Usuario registrado');
        }
    }
}

const loginUsuario = (req, res) => {
    let { user, password } = req.body

    if (!user || !password) {
        res.status(400).send('Faltan datos');
    } else {
        let usuario = usuarios.find(u => u.user === user && u.password === password);
        if (usuario) {
            let token = generarToken();
            usuario.token = token;
            res.cookie('token', token) 
            res.send("usuario logeado");
        } else {
            res.status(401)
            res.send('Usuario o contraseña incorrectos');
        }
    }
}

const logoutUsuario = (req, res) => {
    let usuario = req.usuario
    delete usuario.token
    
    res.send('Usuario deslogueado');
}

const getInfo = (req, res) => {
    let usuario = req.usuario
    res.send('Información sensible');
}

app.post('/registrar', registrarUsuario);
app.post('/login', loginUsuario);
app.put('/logout', validarUsuario, logoutUsuario);
app.get('/info', validarUsuario, getInfo);

// Implementar las rutas necesarias
app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});