import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

app.use(bodyParser.json()); 

let usuarios = [];

app.post('/register', (req, res) => {
    const { username, password, email } = req.body;

    const existeUsuario = usuarios.find(user => user.username === username);
    if (existeUsuario) {
        return res.status(400).json({ message: 'El usuario ya existe. Por favor, elija otro nombre de usuario.' });
    }

    const nuevoUsuario = { username, password, email };
    usuarios.push(nuevoUsuario);

    res.status(201).json({ message: 'Usuario registrado exitosamente.' });
});


app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const usuario = usuarios.find(user => user.username === username && user.password === password);
    if (!usuario) {
        return res.status(401).json({ message: 'Credenciales incorrectas. Por favor, intente de nuevo.' });
    }

    res.status(200).json({ message: 'Inicio de sesión exitoso.' });
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
