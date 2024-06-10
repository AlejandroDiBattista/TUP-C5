import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

let datos = [
    { id: 1, nombre: 'Carlos', apellido: 'Lopez', edad: 25, borrado: false, actualizado: Date.now() },
    { id: 2, nombre: 'Ana', apellido: 'Martinez', edad: 30, borrado: false, actualizado: Date.now() },
    { id: 3, nombre: 'Luis', apellido: 'Garcia', edad: 35, borrado: false, actualizado: Date.now() },
    { id: 4, nombre: 'Maria', apellido: 'Rodriguez', edad: 40, borrado: false, actualizado: Date.now() },
    { id: 5, nombre: 'Juan', apellido: 'Fernandez', edad: 45, borrado: false, actualizado: Date.now() }
];

// GET /personas
app.get('/personas', (req, res) => {
    res.status(200).json(datos.filter(persona => !persona.borrado));
});

// PUT /personas
app.put('/personas', (req, res) => {
    const { id, nombre, apellido, edad, borrado } = req.body;

    if (id) {
        // Actualizar una persona existente
        const personaIndex = datos.findIndex(persona => persona.id === id);
        if (personaIndex !== -1) {
            datos[personaIndex] = {
                ...datos[personaIndex],
                nombre,
                apellido,
                edad,
                borrado: borrado !== undefined ? borrado : datos[personaIndex].borrado,
                actualizado: Date.now()
            };
            return res.status(201).json(datos[personaIndex]);
        } else {
            return res.status(404).send('Persona no encontrada');
        }
    } else {
        // Crear una nueva persona
        const newPersona = {
            id: datos.length ? Math.max(...datos.map(persona => persona.id)) + 1 : 1,
            nombre,
            apellido,
            edad,
            borrado: false,
            actualizado: Date.now()
        };
        datos.push(newPersona);
        return res.status(201).json({ id: newPersona.id });
    }
});

export default app;