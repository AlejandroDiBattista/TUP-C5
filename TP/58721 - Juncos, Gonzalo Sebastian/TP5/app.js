import express from 'express';
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(cors());

let datos = [
    { id: 1, nombre: "Gonzalo", apellido: "Juncos", edad: 19, borrado: false, actualizado: Date.now() },
    { id: 2, nombre: "Santiago", apellido: "Morales", edad: 39, borrado: false, actualizado: Date.now() },
    { id: 3, nombre: "Lucas", apellido: "Perez", edad: 18, borrado: false, actualizado: Date.now() },
    { id: 4, nombre: "Matias", apellido: "Lopez", edad: 22, borrado: false, actualizado: Date.now() },
    { id: 5, nombre: "Ramiro", apellido: "Diaz", edad: 21, borrado: false, actualizado: Date.now() }
];

app.get('/personas', (req, res) => {
    res.status(200).json(datos.filter(persona => !persona.borrado));
});

app.put('/personas', (req, res) => {
    const { id, nombre, apellido, edad, borrado } = req.body;
    let persona = datos.find(p => p.id === id);

    if (id && persona) {
        Object.assign(persona, {
            nombre: nombre || persona.nombre,
            apellido: apellido || persona.apellido,
            edad: edad !== undefined ? edad : persona.edad,
            borrado: borrado !== undefined ? borrado : persona.borrado,
            actualizado: Date.now()
        });
        return res.status(201).json(persona);
    } else if (!id) {
        const nuevoId = datos.length ? Math.max(...datos.map(p => p.id)) + 1 : 1;
        const nuevaPersona = {
            id: nuevoId,
            nombre,
            apellido,
            edad,
            borrado: false,
            actualizado: Date.now()
        };
        datos.push(nuevaPersona);
        return res.status(201).json({ id: nuevaPersona.id });
    } else {
        return res.status(404).json({ mensaje: 'Persona no encontrada' });
    }
});

export default app;