
import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

const app = express();
const PORT = 3001; // Cambiar el puerto si es necesario

app.use(morgan('dev')); 
app.use(cookieParser()); 
app.use(express.json()); 
app.use(express.static('public')); 

const users = {};

app.post('/api/register', (req, res) => {
    const { username, password } = req.body;


    
    if (users[username]) {
        return res.status(400).json({ error: 'Usuario ya existe' });
    }
    users[username] = { password };
    res.status(201).json({ message: 'Usuario registrado' });
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = users[username];
    if (user && user.password === password) {
        res.cookie('username', username, { httpOnly: true });
        return res.status(200).json({ message: 'Inicio de sesión exitoso' });
    }
    res.status(401).json({ error: 'Credenciales inválidas' });
});

app.post('/api/logout', (req, res) => {
    res.clearCookie('username');
    res.status(200).json({ message: 'Sesión cerrada' });
});

app.get('/api/info', (req, res) => {
    const { username } = req.cookies;
    const user = users[username];
    if (!username || !user) {
        return res.status(401).json({ error: 'No autorizado' });
    }
    res.status(200).json({ username, password: user.password });
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
