import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';

const app = express();


app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));
app.use(cors()); 

let users = [];


app.post('/register', (req, res) => {
    const { username, password, celular, email, dni } = req.body;

    if (!username || !password || !celular || !email || !dni) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const userExists = users.some(user => user.username === username);
    if (userExists) {
        return res.status(400).json({ error: "El nombre de usuario ya existe" });
    } else {
        users.push({ username, password, celular, email, dni });
        return res.status(201).json({ message: "Usuario registrado con éxito" });
    }
});


app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "El nombre de usuario y la contraseña son obligatorios" });
    }

    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        return res.status(200).json({ message: "Inicio de sesión exitoso" });
    } else {
        return res.status(400).json({ error: "Usuario o contraseña incorrectos" });
    }
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
