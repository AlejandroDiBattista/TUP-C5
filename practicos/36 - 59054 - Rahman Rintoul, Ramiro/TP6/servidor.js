import express from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import session from 'express-session'

const app = express()
const users = {} //Almacenar usuarios temporalmente

app.use(morgan('dev')) //Loggea cada request en consola
app.use(cookieParser()) //Para leer cookies
app.use(express.json()) //Para leer JSON
app.use(express.static('public')) //Para servir archivos estáticos
app.use(session({
    secret: 'mi_secreto', //Cualquier string (Guarda la Cookie secreta)
    resave: false, // No se guardan las sesiones (Mayor seguridad)
    saveUninitialized: false, // No se guardan las sesiones (Mayor seguridad)
    cookie: { secure: false } //true para https (False para desarrollos locales)
}))

app.post('/register', (req, res) => {
    const { email, username, password, rePassword } = req.body

    if (!email || !username || !password || !rePassword) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' })
    }

    if (password !== rePassword) {
        return res.status(400).json({ message: 'Las contraseñas no coinciden.' })
    }

    if (users[username]) {
        return res.status(400).json({ message: 'Usuario ya registrado.' })
    }

    users[username] = { email, password }
    res.status(200).json({ message: 'Usuario registrado con éxito.' })
})

app.post('/login', (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' })
    }

    const user = users[username]
    if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Credenciales incorrectas.' })
    }

    req.session.user = { username }
    res.status(200).json({ message: 'Inicio de sesión exitoso.' })
})

app.post('/logout', (req, res) => {
    req.session.destroy()
    res.status(200).json({ message: 'Cierre de sesión exitoso.' })
})

app.get('/info', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'No autorizado.' })
    }
    res.status(200).json({ message: `Bienvenido ${req.session.user.username}` })

})

app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000') 
})
