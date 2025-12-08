import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import usuario from './controladores/usuario.js';

const app = express();

app.use(morgan('dev'));     // Loggea cada request en consola
app.use(cookieParser());    // Para leer cookies
app.use(express.json());    // Para leer JSONs
app.use(express.static('public'));  // Para servir archivos estáticos

app.get('/usuarios', usuario.obtenerUsuarios)
app.post('/registrar', usuario.registrarUsuario)
app.post('/login', usuario.loginUsuario)
app.put('/logout', usuario.validarUsuario, usuario.logoutUsuario)
app.get('/info', usuario.validarUsuario, usuario.obtenerInfo)

// Implementar las rutas necesarias
app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});