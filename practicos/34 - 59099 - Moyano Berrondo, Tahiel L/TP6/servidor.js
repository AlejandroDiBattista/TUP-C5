import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://127.0.0.1:5500', // Cambia esto según el puerto y la IP de tu frontend
    credentials: true
}));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));

let usuarios = [
    { id: 1, nombreUsuario: 'Lisandro', contraseña: '1234' },
    { id: 2, nombreUsuario: 'Lautaro',  contraseña: 'Hola' },
    { id: 3, nombreUsuario: 'Lucas',    contraseña: 'zzz' },
    { id: 4, nombreUsuario: 'Esteban',  contraseña: 'Nose' },
    { id: 5, nombreUsuario: 'Tahiel',   contraseña: '4321' },
];

let siguienteIdUsuario = 6;

app.post('/registro', async (req, res) => {
    const { nombreUsuario, contraseña } = req.body;

    const usuarioExistente = usuarios.find(user => user.nombreUsuario === nombreUsuario);
    if (usuarioExistente) {
        return res.status(400).json({ error: 'Usuario existente en la base de datos' });
    }

    const hashedPassword = await bcrypt.hash(contraseña, 10);
    const nuevoUsuario = { id: siguienteIdUsuario++, nombreUsuario, contraseña: hashedPassword };
    usuarios.push(nuevoUsuario);
    console.log('Nuevo usuario registrado:', nuevoUsuario);
    res.status(200).json({ message: 'Tu cuenta se ha registrado correctamente!', user: nuevoUsuario });
});

app.post('/acceso', async (req, res) => {
    const { nombreUsuario, contraseña } = req.body;

    const usuario = usuarios.find(user => user.nombreUsuario === nombreUsuario);
    if (!usuario) {
        return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const isPasswordValid = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!isPasswordValid) {
        return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    res.cookie('sesionUsuario', nombreUsuario, { maxAge: 3600000, httpOnly: true, secure: true });
    console.log('Inicio de sesión exitoso:', usuario);
    res.status(200).json({ message: 'Inicio de sesión exitoso', user: usuario });
});

app.post('/salida', (req, res) => {
    res.clearCookie('sesionUsuario');
    console.log('Sesión cerrada');
    res.status(200).json({ message: 'Sesión cerrada correctamente' });
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
