import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev')); // Loggea cada request en consola
app.use(cookieParser()); // Para leer cookies
app.use(express.json()); // Para leer JSONs
app.use(express.static('public')); // Para servir archivos estáticos

let usuarios = [];

function generarId() {
    return Math.random().toString().substring(2);
}

function validaUsuario(req, res, next) {
    let id = req.cookies.id;
    let usuario = usuarios.find(u => u.id === id);

    if (usuario) {
        req.usuario = usuario;
        next();
    } else {
        res.status(401).send('No iniciado sesion');
    }
}

app.post('/registrar', (req, res) => {
    let { user, password } = req.body;

    if (!user || !password) {
        return res.status(400).send('Faltan datos');
    }

    let existe = usuarios.find(u => u.user === user);
    if (existe) {
        return res.status(402).send("El usuario ya existe");
    }

    usuarios.push({ user, password });// Verificar
    res.send('Usuario registrado');
});

app.post('/login', (req, res) => {
    let { user, password } = req.body;

    if (!user || !password) {
        return res.status(400).send('Faltan datos');
    }




    
    let usuario = usuarios.find(u => u.user === user && u.password === password);
    if (usuario) {
        let id = generarId();
        usuario.id = id;
        res.cookie('id', id, { httpOnly: true });
        return res.send("Usuario logueado");
    }

    res.status(401).send('Usuario y/o contraseña incorrectos');
});

app.put('/logout', validaUsuario, (req, res) => {
    let usuario = req.usuario;
    delete usuario.id;
    res.send('Usuario deslogueado');
});

app.get('/info', validaUsuario, (req, res) => {
    res.send('Usuario logueado');
});
app.listen(3000, () => {
    console.log('Servidor on en: http://localhost:3000');
});