import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

let personas = [
    { id: 1, nombre: "Leonel", apellido: "Mesi", edad: 36, borrado: false, actualizado: Date.now() },
    { id: 2, nombre: "Cristian", apellido: "Ronal", edad: 38, borrado: false, actualizado: Date.now() },
    { id: 3, nombre: "Ney", apellido: "Junior", edad: 32, borrado: false, actualizado: Date.now() },
    { id: 4, nombre: "Kilian", apellido: "Mbapa", edad: 25, borrado: false, actualizado: Date.now() },
    { id: 5, nombre: "Luis", apellido: "Suero", edad: 37, borrado: false, actualizado: Date.now() },
];

app.get('/personas', (req, res) => {
    const personasinborrar = personas.filter(persona => !persona.borrado);
    res.status(200).json(personasinborrar);
});

app.put('/personas', (req, res) => {
    const { id, nombre, apellido, edad, borrado } = req.body;

    if (id) {
        const persona = personas.find(p => p.id === id);
        if (persona) {
            if (borrado !== undefined) {
                persona.borrado = borrado;
            } else {
                persona.nombre = nombre;
                persona.apellido = apellido;
                persona.edad = edad;
            }
            persona.actualizado = Date.now();
            res.status(201).json(persona);
        } else {
            res.status(404).send('Persona no encontrada');
        }
    } else {
        const npersona = {
            id: personas.length ? personas[personas.length - 1].id + 1 : 1,
            nombre,
            apellido,
            edad,
            borrado: false,
            actualizado: Date.now()
        };
        personas.push(npersona);
        res.status(201).json({ id: npersona.id });
    }
});

export default app;
