import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json());
app.use(cors())

let datos = [
    // Datos de ejemplo   
    {id: 1, nombre: 'Ernesto', apellido: 'Lopez', edad: 60, borrado: false, actualizado: 1},
    {id: 2, nombre: 'Carlos', apellido: 'Martinez', edad: 51, borrado: false, actualizado: 2},
    {id: 3, nombre: 'Julio', apellido: 'Palazzo', edad: 39, borrado: false, actualizado: 3},
    {id: 4, nombre: 'Mariano', apellido: 'Molina', edad: 35, borrado: false, actualizado: 4},
    {id: 5, nombre: 'Pablo', apellido: 'Salvatierra', edad: 43, borrado: false, actualizado: 5},
    {id: 6, nombre: 'Cristian', apellido: 'Perez', edad: 31, borrado: false, actualizado: 6},
    {id: 7, nombre: 'Bruno', apellido: 'Gonzalez', edad: 24, borrado: false, actualizado: 7},
    {id: 8, nombre: 'Emiliano', apellido: 'Roca', edad: 26, borrado: false, actualizado: 8}
]

let idExistente = datos.length + 1

app.get('/personas', (req, res) => {
    // Implementar GET_ALL
    const PersonasNoBorradas = datos.filter(p => !p.borrado);
    res.status(200).json(PersonasNoBorradas);
});

app.put('/personas', (req, res) => {
    // Implementar PUT
    const persona = req.body;

    if (persona.id) {
        const indice = datos.findIndex(p => p.id === persona.id);

        if (indice === -1) {
            return res.status(404).send();
        }

        datos[indice] = { ...datos[indice], ...persona };
        return res.status(201).json(datos[indice]);
    } else {
        persona.id = idExistente++;
        persona.borrado = false;
        persona.actualizado = 1;

        datos.push(persona);

        return res.status(201).json(persona);
    }
})

app.post('/personas', (req, res) => {
    const nuevaPersona = req.body;
    nuevaPersona.id = idExistente++;
    nuevaPersona.borrado = false;
    nuevaPersona.actualizado = 1;

    datos.push(nuevaPersona);
    res.status(201).json({ codigo: 201, id: nuevaPersona.id });
});

app.put('/personas/:id', (req, res) => {
    const personaActualizada = req.body;
    const id = parseInt(req.params.id);

    const personaExistente = datos.find(p => p.id === id);
    if (!personaExistente) {
        return res.status(404).send();
    }

    datos = datos.map(p => (p.id === id ? { ...p, ...personaActualizada, actualizado: p.actualizado + 1 } : p));
    res.status(200).json(personaActualizada);
});

export default app