import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json());
app.use(cors())

let datos = [
    { id: 1, nombre: "Juan", apellido: "Perez", edad: 30, borrado: false, actualizado: 1 },
    { id: 2, nombre: "Pedro", apellido: "Jerez", edad: 25, borrado: false, actualizado: 2 },
    { id: 3, nombre: "Andres", apellido: "Diaz", edad: 15, borrado: false, actualizado: 3 },
    { id: 4, nombre: "Carlos", apellido: "Gonzalez", edad: 45, borrado: false, actualizado: 4 },
    { id: 5, nombre: "Gustavo", apellido: "Juarez", edad: 65, borrado: false, actualizado: 5 },
    { id: 6, nombre: "Roberto", apellido: "Sanchez", edad: 85, borrado: false, actualizado: 6 },
]

app.get('/personas', (req, res) => {
    const personasSinBorrar = datos.filter(persona => !persona.borrado);
    
    res.status(200).json(personasSinBorrar);
    res.status(200).json(datos);

});

app.put('/personas', (req, res) => {
    const persona = req.body;

    if (persona.id) {
        let bandera = false;

        datos = datos.map(p => {
            if (p.id === persona.id) {
                bandera = true;
                return {
                    ...p, ...persona, actualizado: p.actualizado + 1
                }
            }
            return p;
        });

        if (bandera) {
            res.status(201).json(datos.find(p => p.id === persona.id));
        } else {
            res.status(404).send();
        }
    } else {
        const nuevoId = datos.length > 0 ?
            Math.max(...datos.map(p => p.id)) + 1 : 1;
        const nuevaPersona = {
            ...persona, id: nuevoId, borrado: false, actualizado: 1
        };
        datos.push(nuevaPersona);
        res.status(201).json(nuevaPersona)
    }
})

export default app;