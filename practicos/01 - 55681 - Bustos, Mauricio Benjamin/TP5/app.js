import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

let datos = [
    { id: 1, nombre: 'Carlos', apellido: 'Ramirez', edad: 26, borrado: false, actualizado: Date.now() },
    { id: 2, nombre: 'Sofia', apellido: 'Fernandez', edad: 31, borrado: false, actualizado: Date.now() },
    { id: 3, nombre: 'Miguel', apellido: 'Lopez', edad: 21, borrado: false, actualizado: Date.now() },
    { id: 4, nombre: 'Laura', apellido: 'Hernandez', edad: 23, borrado: false, actualizado: Date.now() },
    { id: 5, nombre: 'Elena', apellido: 'Torres', edad: 29, borrado: false, actualizado: Date.now() }
]
;

app.get('/personas', (req, res) => {
    const personas = datos.filter(persona => !persona.borrado);
    res.status(200).json(personas);
});

app.put('/personas', (req, res) => {
    const persona = req.body;
    if (persona.id) {
        const index = datos.findIndex(p => p.id === persona.id);
        if (index !== -1) {
            if (persona.borrado) {
                datos[index].borrado = true;
            } else {
                datos[index] = { ...datos[index], ...persona, actualizado: Date.now() };
            }
            res.status(201).json(datos[index]);
        } else {
            res.status(404).json({ error: 'Persona no encontrada' });
        }
    } else {
        const nuevaPersona = {
            ...persona,
            id: datos.length + 1,
            borrado: false,
            actualizado: Date.now()
        };
        datos.push(nuevaPersona);
        res.status(201).json({ id: nuevaPersona.id });
    }
});

export default app;