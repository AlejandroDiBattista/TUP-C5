import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import Usuario from './controllers/usuario.js';
const app = express();

app.use(morgan('dev'));     // Loggea cada request en consola
app.use(cookieParser());    // Para leer cookies
app.use(express.json());    // Para leer JSONs
app.use(express.static('public'));  // Para servir archivos estáticos

app.get('/usuarios', Usuario.getUsuarios); 
app.post('/registrar', Usuario.registrarUsuario);
app.post('/login', Usuario.loginUsuario);
app.put('/logout', Usuario.validarUsuario, Usuario.logoutUsuario);
app.get('/info', Usuario.validarUsuario, Usuario.getInfo);


app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});
