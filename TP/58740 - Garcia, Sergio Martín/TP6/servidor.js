import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
const app = express();

app.use(morgan('dev'));     // Loggea cada request en consola
app.use(cookieParser());    // Para leer cookies
app.use(express.json());    // Para leer JSONs
app.use(express.static('public'));  // Para servir archivos estáticos

let usuarios = []

function tokens() {
    return Math.random().toString().substring(2);
}

function validacion(req, res, next) {
    let token = req.cookies.token
    let usuario = usuarios.find(u => u.token === token)
    if (usuario) {
        req.usuario = usuario
        next()
    } else {
        res.status(401).json({ error: 'No autorizado' })
    }
}

// Implementar las rutas necesarias

app.post('/registro', (req, res) => {
    let { user, password } = req.body
    if (!user || !password) {
        return res.status(400).json({ error: 'Usuario o contraseña inválidos' })
    }

    let existe = usuarios.find(u => u.user === user)
    if (existe) {
        res.status(402).json({ error: 'El usuario ya existe' })
    } else {
        usuarios.push({ user, password })
        res.send('Usuario registrado')
    }

})

app.post('/login', (req, res) => {
    let { user, password } = req.body
    if (!user || !password) {
        return res.status(400).json({ error: 'Usuario o contraseña inválidos' })
    }

    let usuario = usuarios.find(u => u.user === user && u.password === password)
    if (usuario) {
        let token = tokens();
        usuario.token = token
        res.cookie('token', token)
        return res.json('Inicio de sesión exitoso')
    } else {
        return res.status(401).send({ error: 'Usuario o contraseña inválidos' })
    }

})

app.put('/logout', validacion, (req, res) => {
    let usuario = req.usuario
    delete usuario.token
    res.clearCookie('token')
    res.json('Sesión cerrada')
})

app.get('/privado', validacion, (req, res) => {
    res.json('Esta es una ruta privada, solo para usuarios autenticados.')
})

app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});