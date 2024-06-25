import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';

const app = express();
const PUERTO = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://127.0.0.1:5500', // Asegúrate de que este sea el origen correcto de tu frontend
    credentials: true
}));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

let usuarios = [
    { id: 1, nombreUsuario: 'Lisandro', contraseña: '1234' },
    { id: 2, nombreUsuario: 'Lautaro', contraseña: 'Hola' },
    { id: 3, nombreUsuario: 'Lucas', contraseña: 'zzz' },
    { id: 4, nombreUsuario: 'Esteban', contraseña: 'Nose' },
    { id: 5, nombreUsuario: 'Tahiel', contraseña: '4321' },
];

let siguienteIdUsuario = 6; // Para asignar automáticamente el siguiente ID al registrar un nuevo usuario

app.post('/registro', (req, res) => {
    const { nombreUsuario, contraseña } = req.body;

    const usuarioExistente = usuarios.find(user => user.nombreUsuario === nombreUsuario);
    if (usuarioExistente) {
        return res.status(400).json({ error: 'Usuario existente en la base de datos' });
    }

    const nuevoUsuario = { id: siguienteIdUsuario++, nombreUsuario, contraseña };
    usuarios.push(nuevoUsuario);
    console.log('Nuevo usuario registrado:', nuevoUsuario);
    res.status(200).json({ message: 'Tu cuenta se ha registrado correctamente!', user: nuevoUsuario });
});

app.post('/acceso', (req, res) => {
    const { nombreUsuario, contraseña } = req.body;

    const usuario = usuarios.find(user => user.nombreUsuario === nombreUsuario && user.contraseña === contraseña);
    if (!usuario) {
        return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    res.cookie('sesionUsuario', nombreUsuario, { maxAge: 3600000, httpOnly: true });
    console.log('Inicio de sesión exitoso:', usuario);
    res.status(200).json({ message: 'Inicio de sesión exitoso', user: usuario });
});

app.post('/salida', (req, res) => {
    res.clearCookie('sesionUsuario');
    console.log('Sesión cerrada');
    res.status(200).json({ message: 'Sesión cerrada correctamente' });
});

app.listen(PUERTO, () => {
    console.log(`Servidor iniciado en http://localhost:${PUERTO}`);
});
