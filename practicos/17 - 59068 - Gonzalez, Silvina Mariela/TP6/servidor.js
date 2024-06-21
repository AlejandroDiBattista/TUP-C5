import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import session from 'express-session';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(session({
    secret: 'mi_secreto',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.use(cors());
app.use(morgan('dev'));     // Loggea cada request en consola
app.use(cookieParser());    // Para leer cookies
app.use(express.json());    // Para leer JSONs
const pathJoin = path.join(__dirname, 'public')
app.use(express.static(pathJoin));  // Para servir archivos estáticos

let usuarios = [];

app.get('/usuarios/obtener-usuarios', (req, res) => {
    res.status(200).json(usuarios);
});

app.post('/usuarios/crear-usuario', (req, res) => {
    const { username, contrasena } = req.body;

    if (!username || !contrasena) {
        return res.status(400).json({ error: 'Datos de usuario no válidos.' });
    }

    let usuarioExistente = usuarios.find(u => u.username === username);

    if (usuarioExistente) {
        res.status(409).json({ error: 'El usuario ya existe.' });
    } else {
        usuarios.push({ id: usuarios.length + 1, username, contrasena });
        res.status(201).json({ username });
    }
});

app.post('/usuarios/login', (req, res) => {
    const { username, contrasena } = req.body;

    if (!username || !contrasena) {
        return res.status(400).json({ error: 'Datos de usuario no válidos.' });
    }

    let usuario = usuarios.find(u => u.username === username && u.contrasena === contrasena);

    if (usuario) {
        res.cookie('username', usuario.username, { httpOnly: true });
        res.status(200).json({ message: 'Inicio de sesión exitoso', username: usuario.username });
    } else {
        res.status(401).json({ error: 'Credenciales no válidas' });
    }
});

app.post('/usuarios/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ error: 'No se pudo cerrar la sesión' });
        }
        res.clearCookie('username');
        res.status(200).json({ message: 'Sesión cerrada con éxito' });
    });
});

// Implementar las rutas necesarias
app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});