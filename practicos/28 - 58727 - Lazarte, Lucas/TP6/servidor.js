import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));

let usuarios = [];

function generarToken() {
    return Math.random().toString().substring(2);
}

function validarUsuario(req, res, next) {
    let token = req.cookies.token;
    let usuario = usuarios.find(u => u.token === token);

    if (usuario) {
        req.usuario = usuario;
        next();
    } else {
        res.status(401).send('Necesita loguearse para acceder a esta información');
    }
}

app.post('/register', (req, res) => {
    let { username, password, rePassword } = req.body;

    if (!username || !password || !rePassword) {
        return res.status(400).json({ message: 'Datos incompletos' });
    }

    if (password !== rePassword) {
        return res.status(400).json({ message: 'Las contraseñas no coinciden' });
    }

    let existe = usuarios.find(u => u.user === username);
    if (existe) {
        return res.status(402).json({ message: 'El usuario ya existe' });
    }

    usuarios.push({ user: username, password });
    res.status(200).json({ message: 'Usuario registrado exitosamente' });
});

app.post('/login', (req, res) => {
    let { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Datos incompletos' });
    }

    let usuario = usuarios.find(u => u.user === username && u.password === password);
    if (usuario) {
        let token = generarToken();
        usuario.token = token;
        res.cookie('token', token, { httpOnly: true });// Verificar
        return res.status(200).json({ message: 'Inicio de sesión exitoso' });
    }

    res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
});

app.post('/logout', validarUsuario, (req, res) => {
    let usuario = req.usuario;
    delete usuario.token;
    res.status(200).json({ message: 'Usuario deslogueado' });
});

app.get('/info', validarUsuario, (req, res) => {
    let usuario = req.usuario;
    console.log('Usuario en /info:', usuario); 
    res.status(200).json({ message: `Bienvenido, ${usuario.user}!` });
});

app.listen(3001, () => {
    console.log('Servidor iniciado en http://localhost:3001');
});
