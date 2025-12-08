import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

const app = express();
// Middleware
app.use(morgan('dev')); // Loggea cada request en consola
app.use(cookieParser()); // Para leer cookies
app.use(express.json()); // Para leer JSONs
app.use(express.static('public')); // Para servir archivos estáticos





// Array de objetos/datos
let Usuarios = [
    { username: 'admin', password: 'contraseña' },
];

// Ruta para obtener la lista de usuarios
app.get('/usuarios', (req, res) => {
    res.status(200).json(Usuarios);
});

// Ruta de registro
app.post('/registro', (req, res) => {
    const { usuario, contraseña } = req.body;
    const usuarioExistente = Usuarios.find((user) => user.username === usuario);
    if (usuarioExistente) {
        return res.status(400).json({ error: 'El usuario ya esta en uso' });
    } else {
        Usuarios.push({ username: usuario, password: contraseña });
        // console.log('Usuario registrado:', { username: usuario, password: contraseña });
        res.status(200).json({ message: 'Usuario registrado exitosamente' });
    }
});

// Ruta de login
app.post('/login', (req, res) => {
    const { usuario, contraseña } = req.body;
    const user = Usuarios.find((user) => user.username === usuario && user.password === contraseña);
    if (user) {
        const token = Math.random().toString().substring(2);
        user.token = token;
        res.cookie('token', token, { httpOnly: true, expires: new Date(Date.now() + 60 * 60 * 1000) });
        // console.log('Inicio de sesión exitoso');
        // console.log('Usuario logueado:', { username: usuario, password: contraseña, token });
        res.status(200).json({ message: 'Usuario logueado exitosamente' });
    } else {
        return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }
});
// Ruta de deslogueo
app.post('/logout', (req, res) => {
    res.clearCookie('user');
    // console.log('Usuario deslogueado');
    // console.log('Sesión cerrada');
    res.status(200).json({ message: 'Usuario deslogueado exitosamente' });
});

// Inicia el servidor y escucha en el puerto definido
app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});