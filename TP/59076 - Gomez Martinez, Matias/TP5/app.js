import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json());
app.use(cors())

let datos = [
    { id: 1, nombre: "Daniel", apellido: "Garcia", edad: 23, borrado: false, actualizado: Date.now() },
    { id: 2, nombre: "Fabricio", apellido: "Martinez", edad: 21, borrado: false, actualizado: Date.now() },
    { id: 3, nombre: "Sebastian", apellido: "Diaz", edad: 19, borrado: false, actualizado: Date.now() },
    { id: 4, nombre: "Raquel", apellido: "Perez", edad: 25, borrado: false, actualizado: Date.now() },
    { id: 5, nombre: "Denis", apellido: "Lopez", edad: 20, borrado: false, actualizado: Date.now() }
]

app.get('/personas', (req, res) => {
    res.send(datos.filter(persona => !persona.borrado));
});

app.put('/personas', (req, res) => {
    const persona = req.body;

    if (persona.id) {
        const i = datos.findIndex(p => p.id === persona.id);

        if (i === -1) {
            return res.status(404).send('Persona no encontrada');
        } else {
            datos[i] = { ...datos[i], ...persona, actualizado: Date.now() };
            return res.status(201).json(datos[i]);
        }
    } else {
        const nuevaPersona = {
            id: datos.length ? datos[datos.length - 1].id + 1 : 1,
            ...persona,
            borrado: false,
            actualizado: Date.now()
        };
        datos.push(nuevaPersona);
        return res.status(201).json(nuevaPersona);
    }
});

export default app