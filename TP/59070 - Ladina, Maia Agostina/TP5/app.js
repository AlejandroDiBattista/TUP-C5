import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json());
app.use(cors())

let datos = [
    {id: 1, nombre: "Juan", apellido: "Perez", edad: 30, borrado: false, actualizado: 1},
    {id: 2, nombre: "Carolina", apellido: "Medina", edad: 38, borrado: false, actualizado: 2},
    {id: 3, nombre: "Lucas", apellido: "Cordoba", edad: 20, borrado: false, actualizado: 3},
    {id: 4, nombre: "Rosario", apellido: "Gonzalez", edad: 21, borrado: false, actualizado: 4},
    {id: 5, nombre: "Sandra", apellido: "Lopez", edad: 59, borrado: false, actualizado: 5},
    {id: 6, nombre: "Leonel", apellido: "Navarro", edad: 30, borrado: false, actualizado: 6},
    {id: 7, nombre: "Lisandro", apellido: "Villafañe", edad: 30, borrado: false, actualizado: 7},

]

app.get('/personas', (req, res) => {
    const personasNBorradas = datos.filter(persona => !persona.borrado);

    res.status(200).json(personasNBorradas);
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
        const idN = datos.length > 0 ?
            Math.max(...datos.map(p => p.id)) + 1 : 1;
        const persN = {
            ...persona, id: idN, borrado: false, actualizado: 1
        };
        datos.push(persN);
        res.status(201).json(persN)
    }
})

export default app