import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import usuarios from './Controllers/usuarios.js';

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies 
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser()); 
 
// Define routes
app.get('/usuarios', usuarios.ObtenerUsuarios);
app.post('/registrar', usuarios.RegistrarUsuario);
app.post('/login', usuarios.LoginUsuario);
app.put('/logout',usuarios.validarUsuarios ,usuarios.LogoutUsuario);
app.get('/informacion',usuarios.validarUsuarios ,usuarios.Obtenerinformacion);


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
