import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

let datos = [
    { id: 1, nombre: "Alice", apellido: "Smith", edad: 30, borrado: false, actualizado: Date.now() },
    { id: 2, nombre: "Bob", apellido: "Johnson", edad: 40, borrado: false, actualizado: Date.now() },
    { id: 3, nombre: "Charlie", apellido: "Williams", edad: 25, borrado: false, actualizado: Date.now() },
    { id: 4, nombre: "David", apellido: "Brown", edad: 35, borrado: false, actualizado: Date.now() },
    { id: 5, nombre: "Eve", apellido: "Jones", edad: 28, borrado: false, actualizado: Date.now() }
];

app.get('/personas', (req, res) => {
    const personas = datos.filter(persona => !persona.borrado);
    res.status(200).json(personas);
});

app.put('/personas', (req, res) => {
    const persona = req.body;
    let respuesta;

    if (!persona.id) {
        const nuevoId = datos.length ? Math.max(...datos.map(p => p.id)) + 1 : 1;
        persona.id = nuevoId;
        persona.borrado = false;
        persona.actualizado = Date.now();
        datos.push(persona);
        respuesta = { ...persona };
        res.status(201).json(respuesta);
    } else {
        const index = datos.findIndex(p => p.id === persona.id);
        if (index === -1) {
            res.status(404).json({ error: 'Persona no encontrada' });
        } else {
            if (persona.borrado) {
                datos[index].borrado = true;
            } else {
                datos[index] = { ...datos[index], ...persona, actualizado: Date.now() };
            }
            respuesta = { ...datos[index] };
            res.status(201).json(respuesta);
        }
    }
});

export default app;
