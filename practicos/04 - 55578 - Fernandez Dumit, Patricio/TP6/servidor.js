import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev'));     
app.use(cookieParser());    
app.use(express.json());   
app.use(express.static('public'));  

let usuarios = [
    { user: "prueba", password: "prueba" },
]

function crearToken() {
    return Math.random().toString().substring(2);
}

app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

app.post('/registro', (req, res) => {
    let { user, password } = req.body;

    if (!user || !password) {
        res.status(400).json({ ok: false, mensaje: 'Debes completar todos los campos para registrar un usuario' });
        return;
    }

    let usuario = usuarios.find(u => u.user === user);
    if (usuario) {
        res.status(401).json({ ok: false, mensaje: 'Este usuario ya se encuentra registrado' });
    } else {
        usuarios.push({ user, password });
        res.status(201).json({ ok: true, mensaje: 'El usuario ha sido registrado con éxito' });
    }
});

app.put('/logout',(req, res) =>  {
    let usuario = usuarios.find(u =>u.token);

    if (usuario) {
        delete usuario.token;
        res.clearCookie('token');
        res.status(200).json({ ok: true, mensaje: 'El usuario ha sido deslogueado con éxito' });
    } else {
        res.status(401).json({ ok: false, mensaje: 'Token no válido o usuario no encontrado' });
    }
})

app.get('/info',(req, res) =>  {
    let token = req.cookies.token;

    if (!token) {
        res.status(401).json({ ok: false, mensaje: 'No hay una sesión iniciada' });
        return;
    }

    let usuario = usuarios.find(u => u.token === token);
    if (usuario) {
        res.status(200).json({ ok: true, mensaje: 'Información confidencial, tu nombre de usuario es: ', usuario: usuario.user , token: token});
    }
})

app.put('/login',(req, res) => {
    let token = req.cookies.token;
    let { user, password } = req.body;

    let usuarioLogueado = usuarios.find(u => u.user === user && password === u.password && u.token);
    if (usuarioLogueado) {
        res.status(401).json({ ok: false, mensaje: 'Ya existe una sesión iniciada' });
        console.log(token)
        return;
    }

console.log(usuarios);

    let usuario = usuarios.find(u => u.user === user && password === u.password && !u.token);

    if (usuario) {
        let token = crearToken();
        usuario.token = token;
        res.cookie('token', token,
            {
                httpOnly: true,

                expires: new Date(Date.now() + 1000 * 60 * 10)
            });
        res.status(200);
        res.json({ ok: true, mensaje: 'El usuario ha sido logueado con éxito' });
    }
    else {
        res.status(401).json({ ok: false, mensaje: 'Usuario y/o contraseña incorrectos' });
    }
})

app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});