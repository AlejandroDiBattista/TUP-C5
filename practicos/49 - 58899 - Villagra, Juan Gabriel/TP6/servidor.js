import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
const app = express();

app.use(morgan('dev')); 
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public')); 
const users = [];

const genToken= ()=> {
    return Math.random().toString().substring(2);
}

const valUser = (req, res, next) => {
    let token = req.cookies.token;
    let usuario = users.find(u => u.token === token);

    if (usuario) {
        req.usuario = usuario;
        next();
    } else {
        res.status(401).send("No tiene permitido acceder");
    }
}

// Ruta - Registro:
app.post('/registrar', (req, res) => {
    let { user, password } = req.body;

    if (!user || !password) {
        return res.status(400).send("Completa todos los campos!");
    }

    let existe = users.find(u => u.user === user);
    if (existe) {
        return res.status(402).send("Usuario ya existente!");
    }

    users.push({ user, password });
    res.send("Registro completado!");
});

// Ruta - Login:
app.post('/login', (req, res) => {
    let { user, password } = req.body;

    if (!user || !password) {
        return res.status(400).send("Complete todos los campos");
    }

    let usuario = users.find(u => u.user === user && u.password === password);
    if (usuario) {
        let token = genToken();
        usuario.token = token;
        res.cookie('token', token, { httpOnly: true });
        return res.send("Sesión Exitosa!");
    }

    res.status(401).send("Verifica que los datos sean correctos!");
});

// Ruta - Logout:
app.put('/logout', valUser, (req, res) => {
    let usuario = req.usuario;
    delete usuario.token;
    res.send('¡Cierre de sesión exitoso!');
});

// Ruta - Info Sensible:
app.get('/info', valUser, (req, res) => {
    const { user, password } = req.usuario;
    res.send({ user, password });
});


app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});