import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import bcrypt from 'bcrypt';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const users = {};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'))
app.use(session({
    secret: 'secreto',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    if (users[username]) {
        return res.status(400).json({ message: 'Usuario ya existe' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    users[username] = { password: hashedPassword };
    res.status(201).json({ message: 'Usuario registrado' });
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users[username];
    if (user && await bcrypt.compare(password, user.password)) {
        req.session.user = username;
        return res.status(200).json({ message: 'Inicio de sesión exitoso' });
    }
    res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
});

app.post('/api/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Error al cerrar sesión' });
        }
        res.status(200).json({ message: 'Sesión cerrada' });
    });
});

app.get('/api/auth/check', (req, res) => {
    res.json({ isAuthenticated: !!req.session.user });
});

// Middleware para servir index.html en cualquier otra ruta
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000');
});
