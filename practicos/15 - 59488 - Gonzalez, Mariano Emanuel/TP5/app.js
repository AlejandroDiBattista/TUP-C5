import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

let datos = [
    {id: 1, nombre: 'Mariano', apellido: 'Gonzalez', edad: 24, borrado: false, actualizado: 1},
    {id: 2, nombre: 'Laura', apellido: 'Martínez', edad: 30, borrado: false, actualizado: 1},
    {id: 3, nombre: 'Carlos', apellido: 'López', edad: 45, borrado: false, actualizado: 1},
    {id: 4, nombre: 'Ana', apellido: 'Sánchez', edad: 28, borrado: false, actualizado: 1},
    {id: 5, nombre: 'Pedro', apellido: 'Ramírez', edad: 35, borrado: false, actualizado: 1},
    {id: 6, nombre: 'María', apellido: 'Fernández', edad: 50, borrado: false, actualizado: 1},
    {id: 7, nombre: 'Lucía', apellido: 'Gómez', edad: 22, borrado: false, actualizado: 1},
    {id: 8, nombre: 'Javier', apellido: 'Rodríguez', edad: 41, borrado: false, actualizado: 1},
    {id: 9, nombre: 'Sofía', apellido: 'Pérez', edad: 27, borrado: false, actualizado: 1},
    {id: 10, nombre: 'Gabriel', apellido: 'Hernández', edad: 33, borrado: false, actualizado: 1}
];

let idActual = datos.length + 1;

app.get('/personas', (req, res) => {
    const personasNoBorradas = datos.filter(p => !p.borrado);
    res.status(200).json(personasNoBorradas);
});

app.post('/personas', (req, res) => {
    const nuevaPersona = req.body;
    nuevaPersona.id = idActual++;
    nuevaPersona.borrado = false;
    nuevaPersona.actualizado = 1;

    datos.push(nuevaPersona);
    res.status(201).json({ codigo: 201, id: nuevaPersona.id });
});

app.put('/personas', (req, res) => {
    const persona = req.body;

    if (persona.id) {
        const indice = datos.findIndex(p => p.id === persona.id);

        if (indice === -1) {
            return res.status(404).send();
        }

        datos[indice] = { ...datos[indice], ...persona };
        return res.status(201).json(datos[indice]);  // Cambiado a 201
    } else {
        persona.id = idActual++;
        persona.borrado = false;
        persona.actualizado = 1;

        datos.push(persona);

        return res.status(201).json(persona);
    }
});

app.put('/personas/:id', (req, res) => {
    const personaActualizada = req.body;
    const id = parseInt(req.params.id);

    const pexiste = datos.find(p => p.id === id);
    if (!pexiste) {
        return res.status(404).send();
    }

    datos = datos.map(p => (p.id === id ? { ...p, ...personaActualizada, actualizado: p.actualizado + 1 } : p));
    res.status(201).json(personaActualizada);  
});

app.delete('/personas/:id', (req, res) => {
    const { id } = req.params;
    const pexiste = datos.findIndex(p => p.id === parseInt(id));

    if (pexiste === -1) {
        return res.status(404).json({ error: "La persona no existe" });
    }

    const personaBorrada = datos.splice(pexiste, 1)[0];
    res.status(201).json(personaBorrada);  
});

export default app;
