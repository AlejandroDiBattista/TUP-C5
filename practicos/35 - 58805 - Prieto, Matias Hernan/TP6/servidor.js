import express from 'express';
import cookieParser from 'cookie-parser';
import morgan
    from 'morgan';
import controladorUsuario from './controladorUsuario.js';



const app = express();

app.use(morgan('dev'));     // Loggea cada request en consola
app.use(cookieParser());    // Para leer cookies
app.use(express.json());    // Para leer JSONs
app.use(express.static('public'));  // Para servir archivos estáticos

app.post('/registrar', controladorUsuario.insertarUsuarios)
app.get('/usuarios', controladorUsuario.obtenerUsuarios)
app.put('/login', controladorUsuario.loguearUsuarios)
app.put('/logout', controladorUsuario.logout)
// Implementar las rutas necesarias
app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});