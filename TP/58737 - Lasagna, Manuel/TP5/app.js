import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

let datos = [
    { id: 1, nombre: 'Juan', apellido: 'Pérez', edad: 30, borrado: false, actualizado: Date.now() },
    { id: 2, nombre: 'Ana', apellido: 'Gómez', edad: 25, borrado: false, actualizado: Date.now() },
    { id: 3, nombre: 'Luis', apellido: 'Martínez', edad: 35, borrado: false, actualizado: Date.now() },
    { id: 4, nombre: 'María', apellido: 'López', edad: 28, borrado: false, actualizado: Date.now() },
    { id: 5, nombre: 'Carlos', apellido: 'Sánchez', edad: 40, borrado: false, actualizado: Date.now() },
];


app.get('/personas', (req, res) => {
    res.status(200).json(datos.filter(persona => !persona.borrado));
});


app.put('/personas', (req, res) => {
    const { id, nombre, apellido, edad, borrado } = req.body;

    if (id === undefined) {
        
        const newId = datos.length ? Math.max(...datos.map(p => p.id)) + 1 : 1;
        const newPersona = { id: newId, nombre, apellido, edad, borrado: false, actualizado: Date.now() };
        datos.push(newPersona);
        return res.status(201).json({ id: newId });
    } else {
        
        const index = datos.findIndex(persona => persona.id === id);

        if (index !== -1) {
            datos[index] = {
                ...datos[index],
                nombre: nombre || datos[index].nombre,
                apellido: apellido || datos[index].apellido,
                edad: edad || datos[index].edad,
                borrado: borrado !== undefined ? borrado : datos[index].borrado,
                actualizado: Date.now()
            };
            return res.status(201).json(datos[index]);
        } else {
            return res.status(404).json({ mensaje: 'Persona no encontrada' });
        }
    }
});

export default app;
