import express from 'express';
import session from 'express-session';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));
app.use(session({
    secret: 'secreto',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 } // 1 hora
}));

let Usuarios = [
    { username: 'admin', password: 'contraseña' },
];


app.get('/usuarios', (req, res) => {
    res.status(200).json(Usuarios);
});


app.post('/registro', (req, res) => {
    const { usuario, contraseña } = req.body;
    const usuarioExistente = Usuarios.find((user) => user.username === usuario);
    if (usuarioExistente) {
        return res.status(400).json({ error: 'El usuario ya está en uso' });
    } else {
        Usuarios.push({ username: usuario, password: contraseña });

        res.status(200).json({ message: 'Usuario registrado exitosamente' });
    }
});


app.post('/login', (req, res) => {
    const { usuario, contraseña } = req.body;
    const user = Usuarios.find((user) => user.username === usuario && user.password === contraseña);
    if (user) {
        req.session.usuario = usuario;




        res.status(200).json({ message: 'Usuario logueado exitosamente' });
    } else {
        return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }
});

app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Error al cerrar sesión' });
        } else {
            res.status(200).json({ message: 'Usuario deslogueado exitosamente' });
        }
    });
});

app.get('/verificarSesion', (req, res) => {
    if (req.session.usuario) {
        res.status(200).json({ usuario: req.session.usuario });
    } else {
        res.status(401).json({ error: 'No hay usuario logueado' });
    }
});

app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});
