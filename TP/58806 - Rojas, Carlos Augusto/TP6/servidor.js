import controller from './controller.js';
import express from 'express';
import cookieParser from 'cookie-parser';
import morgan
 from 'morgan';
const app = express();

app.use(morgan('dev'));     // Loggea cada request en consola
app.use(cookieParser());    // Para leer cookies
app.use(express.json());    // Para leer JSONs
app.use(express.static('public'));  // Para servir archivos estáticos

// Implementar las rutas necesarias
app.get("/validation", controller.validation);

app.put("/login", controller.login);

app.put("/logout", controller.logout);

app.post("/register", controller.register);

app.get("/mostrarDatos", controller.mostrarDatos);

app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});