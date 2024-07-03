import express from 'express';
import morgan from 'morgan';
import Usuario from './controllers/usuario.js';
import cookieParser from 'cookie-parser';

const app = express();

// Middleware para parsear el body
app.use(express.static('public'));  // Para servir archivos estáticos

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

// API 


app.listen(3000, () => {
    console.log('Servidor en http://localhost:3000');
})

