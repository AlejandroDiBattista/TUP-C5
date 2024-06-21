import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { login, register, logout, validarUsuario, getInfo } from './controllers/controlador.js';

const app = express();

app.use(morgan('dev'));     // Loggea cada request en consola
app.use(cookieParser());    // Para leer cookies
app.use(express.json());    // Para leer JSONs
app.use(express.static('public'));  // Para servir archivos estáticos


// Implementar las rutas necesarias

app.post('/login', login)
app.post('/register', register)
app.put('/logout', validarUsuario, logout)
app.get('/info', validarUsuario, getInfo);



app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});