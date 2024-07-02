import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

const app = express();
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));

const usuarios = [];

const validarUsuario = (req, res, next) => {
    const id = req.cookies.id;
    const usuario = usuarios.find(u => u.id === id);

    if (usuario) {
        req.usuario = usuario;
        next();
    } else {
        res.status(401).send('no pud.');
    }
};

const generarId = () => {
    return Math.random().toString().substring(2);
};

app.post('/registrar', (req, res) => {
    const { user, password } = req.body;

    if (!user || !password) {
        return res.status(400).send('Complete los campos para iniciar');
    }

    const existe = usuarios.find(u => u.user === user);// Verificar
    if (existe) {
        return res.status(402).send("Usuario ya existente, pruebe con otro");
    }

    usuarios.push({ user, password });// Verificar
    res.send('Registro completado');
});

app.post('/login', (req, res) => {
    const { user, password } = req.body;

    if (!user || !password) {
        return res.status(400).send('Ingrese su usuario y contraseña');
    }

    const usuario = usuarios.find(u => u.user === user && u.password === password);
    if (usuario) {
        const id = generarId();
        usuario.id = id;
        res.cookie('id', id, { httpOnly: true });
        return res.send("Bienvenido");
    }

    res.status(401).send('Los datos son incorrectos');
});

app.put('/logout', validarUsuario, (req, res) => {
    const usuario = req.usuario;
    delete usuario.id;
    res.send('Sesion cerrada');
});

app.get('/info', validarUsuario, (req, res) => {
    const usuario = req.usuario;
    res.send(`Bienvenido ${usuario.user}!`);
});

app.listen(5000, () => {
    console.log('Servidor iniciado http://localhost:5000');
});