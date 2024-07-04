import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';
import Joi from 'joi';

const app = express();
const secretKey = 'your-secret-key'; // Almacenar en una variable de entorno

app.use(morgan('dev')); // Loguea cada request en consola
app.use(cookieParser()); // Para leer cookies
app.use(express.json()); // Para leer JSONs
app.use(express.static('public')); // Para servir archivos estáticos

let usuarios = [
    { user: "admin", password: "admin" } 
];

// Validación de entrada con Joi
const userSchema = Joi.object({
    user: Joi.string().min(3).required().messages({
        'string.empty': 'El campo "usuario" no puede estar vacío.',
        'string.min': 'El campo "usuario" debe tener al menos 3 caracteres.',
        'any.required': 'El campo "usuario" es obligatorio.'
    }),
    password: Joi.string().min(6).required().messages({
        'string.empty': 'El campo "contraseña" no puede estar vacío.',
        'string.min': 'El campo "contraseña" debe tener al menos 6 caracteres.',
        'any.required': 'El campo "contraseña" es obligatorio.'
    })
});

function generarToken(user) {
    return jwt.sign({ user }, secretKey, { expiresIn: '1h' }); 
}

function validarUsuario(req, res, next) {
    let token = req.get('Autorizacion');
    if (!token) {
        return res.status(401).json({ ok: false, mensaje: 'No autorizado' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ ok: false, mensaje: 'Token inválido' });
        }

        req.usuario = decoded.user;
        next();
    });
}

app.post('/registrar', async (req, res) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ ok: false, mensaje: error.details[0].message });
    }

    let { user, password } = req.body;
    let usuario = usuarios.find(u => u.user === user);
    if (usuario) {
        return res.status(401).json({ ok: false, mensaje: 'Usuario ya registrado' });
    }
    try {
        usuarios.push({ user, password });// Verificar
        res.status(201).json({ ok: true, mensaje: 'Usuario registrado' });
    } catch (error) {
        res.status(500).json({ ok: false, mensaje: 'Error al registrar el usuario' });
    }
});

app.put('/login', async (req, res) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ ok: false, mensaje: error.details[0].message });
    }

    let { user, password } = req.body;
    let usuario = usuarios.find(u => u.user === user);
    if (usuario && password === usuario.password) { 
        let token = generarToken(user);
        usuario.token = token; 
        res.set('Autorizacion', token);
        res.status(200).json({ ok: true, mensaje: 'Usuario logueado' });
    } else {
        res.status(401).json({ ok: false, mensaje: 'Usuario o contraseña incorrectos' });
    }
});

app.put('/logout', validarUsuario, (req, res) => {
    let usuario = req.usuario;
    res.status(200).json({ ok: true, mensaje: 'Usuario deslogueado' });
});

app.get('/info', validarUsuario, (req, res) => {
    const usuario = usuarios.find(u => u.user === req.usuario);
    if (usuario) {
        res.status(200).json({
            ok: true,
            mensaje: 'Información',
            usuario: {
                user: usuario.user,
                password: usuario.password, 
                creationDate: new Date()
            },
            token: req.get('Autorizacion')
        });
    } else {
        res.status(404).json({ ok: false, mensaje: 'Usuario no encontrado' });
    }
});

app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});