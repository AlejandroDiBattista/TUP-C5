import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import Cosas from './controlador/cosas.js';

const app = express();

app.use(morgan('dev'));     // Loggea cada request en consola
app.use(cookieParser());    // Para leer cookies
app.use(express.json());    // Para leer JSONs
app.use(express.static('public'));  // Para servir archivos estáticos




// Implementar las rutas necesarias

app.put('/login', Cosas.login);
app.post('/registrar', Cosas.registrar);
app.put('/logout', Cosas.validarUsuario, Cosas.logout);
app.put('/info', Cosas.info);

app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});