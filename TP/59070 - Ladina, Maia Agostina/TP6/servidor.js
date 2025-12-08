import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));

let usuarios = [
    { nombreUsuario: "Micaela", clave: "2000" },
]

function generarToken() {
    return Math.random().toString().substring(2);
}

app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

app.post('/registro', (req, res) => {
    let { nombreUsuario, clave } = req.body;

    if (!nombreUsuario || !clave) {
        res.status(400).json({ ok: false, mensaje: 'Faltan datos' });
        return;
    }

    let usuarioExistente = usuarios.find(u => u.nombreUsuario === nombreUsuario);
    if (usuarioExistente) {
        res.status(401).json({ ok: false, mensaje: 'Usuario existente' });
    } else {
        usuarios.push({ nombreUsuario, clave });
        res.status(201).json({ ok: true, mensaje: 'Usuario registrado' });
    }
});

app.put('/cerrarSes', (req, res) => {
    let usuario = usuarios.find(u => u.token);

    if (usuario) {
        delete usuario.token;
        res.clearCookie('token');
        res.status(200).json({ ok: true, mensaje: 'Se ha deslogueado' });
    } else {
        res.status(401).json({ ok: false, mensaje: 'Token INCORRECTO o usuario NO encontrado' });
    }
})

app.get('/informacion', (req, res) => {
    let token = req.cookies.token;

    if (!token) {
        res.status(401).json({ ok: false, mensaje: 'No hay sesión iniciada' });
        return;
    }

    let usuario = usuarios.find(u => u.token === token);
    if (usuario) {
        res.status(200).json({  nombreUsuario: usuario.nombreUsuario, token: token });
    }
})

app.put('/iniciarSes', (req, res) => {
    let token = req.cookies.token;
    let { nombreUsuario, clave } = req.body;

    let usuarioLogueado = usuarios.find(u => u.nombreUsuario === nombreUsuario && clave === u.clave && u.token);
    if (usuarioLogueado) {
        res.status(401).json({ ok: false, mensaje: 'Ya existe una sesión iniciada' });
        console.log(token)
        return;
    }

    let usuario = usuarios.find(u => u.nombreUsuario === nombreUsuario && clave === u.clave && !u.token);

    if (usuario) {
        let token = generarToken();
        usuario.token = token;
        res.cookie('token', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 60 * 10)
        });
        res.status(200);
        res.json({ ok: true, mensaje: 'Usuario Registrado' });
    }
    else {
        res.status(401).json({ ok: false, mensaje: 'Usuario o clave incorrectos' });
    }
})

app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});