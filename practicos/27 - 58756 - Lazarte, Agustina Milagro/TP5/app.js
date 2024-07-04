import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

let datos = [
    { id: 1, nombre: 'Milagro', apellido: 'Diaz', edad: 30, borrado: false, actualizado: Date.now() },
    { id: 2, nombre: 'Luciano', apellido: 'Gomez', edad: 32, borrado: false, actualizado: Date.now() },
    { id: 3, nombre: 'Martin', apellido: 'Perez', edad: 25, borrado: false, actualizado: Date.now() },
    { id: 4, nombre: 'Lucia', apellido: 'Castro', edad: 20, borrado: false, actualizado: Date.now() },
    { id: 5, nombre: 'Guadalupe', apellido: 'Montero', edad: 40, borrado: false, actualizado: Date.now() }
];

app.get('/personas', (req, res) => {
    const personasActivas = datos.filter(persona => !persona.borrado);
    res.status(200).json(personasActivas);
});

app.put('/personas', (req, res) => {
    const { id, nombre, apellido, edad, borrado } = req.body;

    if (id) {
        const personaExistente = datos.find(p => p.id === id);
        if (personaExistente) {
            if (nombre) personaExistente.nombre = nombre;
            if (apellido) personaExistente.apellido = apellido;
            if (edad) personaExistente.edad = edad;
            if (borrado !== undefined) personaExistente.borrado = borrado;
            personaExistente.actualizado = Date.now();
            return res.status(201).json(personaExistente);
        } else {
            return res.status(404).json({ error: 'Persona no encontrada' });
        }
    } else {
        if (!nombre || !apellido || !edad) {
            return res.status(400).json({ error: 'Datos incompletos' });
        }
        const nuevaPersona = {
            id: datos.length + 1,
            nombre,
            apellido,
            edad,
            borrado: false,
            actualizado: Date.now()
        };
        datos.push(nuevaPersona);
        return res.status(201).json(nuevaPersona);
    }
});

export default app;
