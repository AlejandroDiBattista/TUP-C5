import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

let datos = [
    { id: 1, nombre: "Flavia", apellido: "González Nacusse", edad: 27, borrado: true, actualizado: 1 },
    { id: 2, nombre: "Florencia", apellido: "González", edad: 25, borrado: false, actualizado: 1 },
    { id: 3, nombre: "Juan", apellido: "Peralta", edad: 20, borrado: false, actualizado: 1 },
    { id: 4, nombre: "Carlos", apellido: "Sanchez", edad: 19, borrado: false, actualizado: 1 },
    { id: 5, nombre: "Camila", apellido: "Gimenez", edad: 26, borrado: false, actualizado: 1 },
    { id: 6, nombre: "Luciano", apellido: "Lopez", edad: 17, borrado: false, actualizado: 1 },
];
app.get('/personas', (req, res) => {
    const personasActivas = datos.filter(persona => !persona.borrado);
    res.status(200).json(personasActivas);
});
app.put('/personas', (req, res) => {
    const persona = req.body;
    if (!persona.id) {
        persona.id = datos.length ? Math.max(...datos.map(p => p.id)) + 1 : 1;
        persona.borrado = false;
        persona.actualizado = Date.now();
        datos.push(persona);
        res.status(201).json({ message: 'Persona agregada', id: persona.id });
    } else {
        const index = datos.findIndex(p => p.id === persona.id);
        
        if (index !== -1) {
            datos[index] = { ...datos[index], ...persona, actualizado: Date.now() };
            res.status(201).json({ message: 'Persona actualizada', ...datos[index] }); 
        } else {
            res.status(404).json({ message: 'Persona no encontrada' });
        }
    }
});

app.put('/personas/borrar', (req, res) => {
    const persona = req.body;
    const index = datos.findIndex(p => p.id === persona.id);
    
    if (index !== -1) {
        datos[index].borrado = true;
        datos[index].actualizado = Date.now();
        res.status(201).json({ message: 'Persona borrada', ...datos[index] }); 
    } else {
        res.status(404).json({ message: 'Persona no encontrada' });
    }
});
app.get('/personas/numero', (req, res) => {
    const personasActivas = datos.filter(persona => !persona.borrado);
    res.status(200).json(personasActivas.length);
});
export default app;
