import express from 'express';
import cookieParser from 'cookie-parser';
import Usuario from './controllers/usuario.js'
import morgan from 'morgan';

const app = express()
const users = {}

app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.json())
app.use(express.static('public'))

app.post('/register', (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).json({ error: 'Username y contraseña son requeridos' })
    }
    if (users[username]) {
        return res.status(400).json({ error: 'El usuario ya existe' })
    }
    users[username] = { password };
    res.status(200).json({ message: 'Usuario registrado exitosamente' })
})

app.post('/login', (req, res) => {
    const { username, password } = req.body
    const user = users[username]
    if (!user || user.password !== password) {
        
        return res.status(401).json({ error: 'Usuario o contraseña inválidos' })
    }
    res.cookie('username', username, { httpOnly: true })
    res.status(200).json({ message: 'Inicio de sesión exitoso' })
})

app.post('/logout', (req, res) => {
    res.clearCookie('username')
    res.status(200).json({ message: 'Sesión cerrada exitosamente' })
})

app.use((req, res, next) => {
    if (req.cookies.username) {
        next()
    } else {
        res.status(401).json({ error: 'No autorizado' })
    }
})

app.get('/info', (req, res) => {
    res.status(200).json({ message: `BIENVENIDO ${req.cookies.username}` })
})

app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000')
})
