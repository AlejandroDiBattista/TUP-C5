import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

const app = express();
const PORT = 3000;

app.use(morgan('dev'));           // Logging de cada request en consola
app.use(cookieParser());          // Para leer cookies
app.use(express.json());          // Para leer JSONs
app.use(express.static('public'));  // Para servir archivos estáticos

// JSON para almacenar los usuarios registrados (simulación)
let users = [];

// Rutas

// Ruta para registrar un nuevo usuario
app.post('/register', (req, res) => {
    console.log('Datos recibidos:', req.body); // Verificar datos recibidos en consola del servidor
    const { username, password, confirmPassword, phone, email } = req.body;

    // Validar que todos los campos requeridos estén presentes
    if (!username || !password || !confirmPassword || !phone || !email) {
        return res.status(400).json({ error: 'Por favor completa todos los campos.' });
    }

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Las contraseñas no coinciden.' });
    }

    // Validar si el usuario ya existe
    if (users.find(user => user.username === username)) {
        return res.status(400).json({ error: 'El usuario ya existe.' });
    }

    // Agregar el usuario a la lista (simulación)
    users.push({ username, password, phone, email });
    console.log('Usuarios registrados:', users); // Verificar en consola
    res.status(200).json({ message: 'Usuario registrado exitosamente.' });
});

// Ruta para iniciar sesión
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Buscar el usuario en la lista (simulación)
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(401).json({ error: 'Credenciales incorrectas.' });
    }

    // Simular una cookie de sesión
    res.cookie('loggedIn', true, { maxAge: 900000, httpOnly: true });
    res.status(200).json({ message: 'Inicio de sesión exitoso.' });
});

// Ruta para cerrar sesión
app.post('/logout', (req, res) => {
    res.clearCookie('loggedIn');
    res.status(200).json({ message: 'Cierre de sesión exitoso.' });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
