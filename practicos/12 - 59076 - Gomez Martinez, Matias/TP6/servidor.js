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

app.post('/login', Cosas.login);;

// app.get('/formulario', (req, res) => {
//     console.log('params', req.query);
//     res.send('Get funciona');
// });

// app.post('/formulario', (req, res) => {
//     console.log('body', req.body);
//     res.send('POST funciona');
//     res.end();
// });

app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});