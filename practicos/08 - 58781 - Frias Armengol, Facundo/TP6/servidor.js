import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

const aplicación = express();

aplicación.use(morgan('dev'));
aplicación.use(cookieParser());
aplicación.use(express.json());
aplicación.use(express.static('public'));

const usuarios = [];

const validarUsuario = (req, res, siguiente) => {
    const id = req.cookies.identificación;
    const usuario = usuarios.find(u => u.id === id);

    if (usuario) {
        req.usuario = usuario;
        siguiente();
    } else {
        res.status(401).send('Sin autorización');
    }
};

const generarId = () => {
    return Math.random().toString().substring(2);
};

aplicación.post('/registrador', (req, res) => {
    const { usuario, contraseña } = req.body;

    if (!usuario || !contraseña) {
        return res.status(400).send('Por favor complete los datos para registrarse.');
    }

    const existe = usuarios.find(u => u.usuario === usuario);
    if (existe) {
        return res.status(402).send('Este usuario ya existe, pruebe uno diferente.');
    }

    usuarios.push({ usuario, contraseña });
    res.send('¡Se ha registrado correctamente!');
});

aplicación.post('/iniciar sesión', (req, res) => {
    const { usuario, contraseña } = req.body;

    if (!usuario || !contraseña) {
        return res.status(400).send('Ingrese su nombre de usuario y contraseña.');
    }

    const usuarioEncontrado = usuarios.find(u => u.usuario === usuario && u.contraseña === contraseña);
    if (usuarioEncontrado) {
        const id = generarId();
        usuarioEncontrado.id = id;
        res.cookie('identificación', id, { httpOnly: true });
        return res.send('¡Bienvenido a nuestra página de prueba!');
    }

    res.status(401).send('Usuario o contraseña incorrectos.');
});

aplicación.put('/logout', validarUsuario, (req, res) => {
    const usuario = req.usuario;
    delete usuario.id;
    res.send('¡Ha cerrado sesión correctamente!');
});

aplicación.get('/info', validarUsuario, (req, res) => {
    const usuario = req.usuario;
    res.send("¡Bienvenido ${usuario.usuario}! Estás logueado.");
});

aplicación.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
})