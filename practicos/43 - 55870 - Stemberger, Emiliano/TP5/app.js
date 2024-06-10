import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

let datos = [
    { id: 1, nombre: 'Carlos', apellido: 'Martínez', edad: 35, borrado: false, actualizado: 3 },
    { id: 2, nombre: 'Ana', apellido: 'García', edad: 28, borrado: false, actualizado: 2 },
    { id: 3, nombre: 'Luis', apellido: 'Fernández', edad: 40, borrado: false, actualizado: 1 },
    { id: 4, nombre: 'Marta', apellido: 'Rodríguez', edad: 32, borrado: false, actualizado: 5 },
    { id: 5, nombre: 'Pedro', apellido: 'López', edad: 45, borrado: false, actualizado: 6 },
];

const asignarId = () => {
    const ids = datos.map(persona => persona.id);
    const maxId = Math.max(...ids);
    return maxId + 1;
};

app.get('/personas', (req, res) => {
    const personasNoBorradas = datos.filter(p => !p.borrado);
    res.json(personasNoBorradas);
});

app.put('/personas', (req, res) => {
    const persona = req.body;

    if (persona.id) {
        const indice = datos.findIndex(p => p.id === persona.id);

        if (indice === -1) {
            return res.status(404).send({ error: 'Persona no encontrada' });
        }

        if (persona.borrado) {
            datos[indice].borrado = true;
            return res.status(201).json(datos[indice]);
        } else {
            datos[indice] = { ...datos[indice], ...persona, actualizado: datos[indice].actualizado + 1 };
            return res.status(201).json(datos[indice]);
        }
    } else {
        persona.id = asignarId();
        persona.borrado = false;
        persona.actualizado = 1;
        datos.push(persona);

        return res.status(201).json(persona);
    }
});

export default app;