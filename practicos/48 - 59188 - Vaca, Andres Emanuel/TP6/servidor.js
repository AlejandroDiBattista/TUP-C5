import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

const app = express();


app.use(morgan('dev')); // Logea cada request en consola
app.use(cookieParser()); // Para leer cookies
app.use(express.json()); // Para leer JSONs
app.use(express.static('public')); // Para servir archivos estáticos


let usuarios = [
    
    {   user:'andres', password: 'vaca',
        user:'admin', password: 'admin', 
     }
];

function validarUsuario(req, res, next) {
    let token = req.cookies.token;
    let usuario = usuarios.find(u => u.token === token);

    if (usuario) {
        req.usuario = usuario;
        next();
    } else {
        res.status(401).send('Acceso no autorizado');
    }
}

function generarToken() {
    return Math.random().toString().substring(2);
}

app.post('/registrar', (req, res) => {
    let { user, password } = req.body;

    if (!user || !password) {
        res.status(400).send('Faltan datos');
    } else {
        let existe = usuarios.find(u => u.user === user);
        if (existe) {
            res.status(409).send('El usuario ya existe');
        } else {
            usuarios.push({ user, password });
            res.send('Usuario registrado');
        }
    }
});


app.post('/login', (req, res) => {
    let { user, password } = req.body;

    if (!user || !password) {
        res.status(400).send('Faltan datos');
    } else {
        let usuario = usuarios.find(u => u.user === user && u.password === password);
        if (usuario) {
            let token = generarToken();
            usuario.token = token;
            res.cookie('token', token); 
            res.send('Usuario logueado');
        } else {
            res.status(401).send('Usuario o contraseña incorrectos');
        }
    }
});

app.post('/logout', validarUsuario, (req, res) => {
    let usuario = req.usuario;
    delete usuario.token;
    res.send('Usuario deslogueado');
});

app.get('/info', validarUsuario, (req, res) => {
    res.send('Información sensible');
});

app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});;
