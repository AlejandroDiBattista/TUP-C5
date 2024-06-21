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
        return res.status(400).send('complete los datos para iniciar.');
    }

    const existe = usuarios.find(u => u.user === user);
    if (existe) {
        return res.status(402).send("este usuario ya existe pruebe uno diferente.");
    }

    usuarios.push({ user, password });
    res.send('te has registrado correctamente.');
});

app.post('/login', (req, res) => {
    const { user, password } = req.body;

    if (!user || !password) {
        return res.status(400).send('ingresa tu nombre de usuario y contraseña.');
    }

    const usuario = usuarios.find(u => u.user === user && u.password === password);
    if (usuario) {
        const id = generarId();
        usuario.id = id;
        res.cookie('id', id, { httpOnly: true });
        return res.send("bienvenido a nuestra pagina de prueba.");
    }

    res.status(401).send('el usuario o la contraseña esta erronea.');
});

app.put('/logout', validarUsuario, (req, res) => {
    const usuario = req.usuario;
    delete usuario.id;
    res.send('Has cerrado sesión .');
});

app.get('/info', validarUsuario, (req, res) => {
    const usuario = req.usuario;
    res.send(`Bienvenido ${usuario.user}! Estás logueado.`);
});

app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});
