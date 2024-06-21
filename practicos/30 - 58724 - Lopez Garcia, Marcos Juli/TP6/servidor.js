import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import bodyParser from 'body-parser';

const app = express();
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static('public'));

const users = {};

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (users[username]) {
        return res.status(400).json({ message: 'Usuario ya registrado' });
    }
    users[username] = password;
    res.status(201).json({ message: 'Usuario registrado con éxito' });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (users[username] && users[username] === password) {
        res.cookie('username', username, { httpOnly: true });
        return res.json({ message: 'Inicio de sesión exitoso' });
    }
    res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
});

app.post('/logout', (req, res) => {
    res.clearCookie('username');
    res.json({ message: 'Sesión cerrada con éxito' });
});

app.get('/protected', (req, res) => {
    if (req.cookies.username) {
        return res.json({ message: `Bienvenido ${req.cookies.username}` });
    }
    res.status(401).json({ message: 'No autorizado' });
});

app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});
