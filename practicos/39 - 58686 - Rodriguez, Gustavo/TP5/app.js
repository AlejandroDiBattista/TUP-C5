import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json());
app.use(cors())


let datos = [
    {id: 1, nombre:"Juan", apellido:"Perez", edad: 30, borrado: false, actualizado: 1},
    {id: 2, nombre:"Ana", apellido:"Gomez", edad: 25, borrado: false, actualizado: 1},
    {id: 3, nombre:"Luis", apellido:"Martinez", edad: 28, borrado: false, actualizado: 1},
    {id: 4, nombre:"Maria", apellido:"Lopez", edad: 35, borrado: false, actualizado: 1},
    {id: 5, nombre:"Carlos", apellido:"Garcia", edad: 32, borrado: false, actualizado: 1},
    {id: 6 , nombre:"Lautaro", apellido:"Rivadeneira", edad:32 , borrado: false , actualizado:1},
    {id: 7 , nombre:"Gabriel" , apellido:"Salazar" , edad:89 , borrado: false, actualizado:1},
];

app.get('/personas', (req, res) => {
    const personasActivas = datos.filter(p => !p.borrado)
    res.status(200).json(personasActivas)
});

app.put('/personas', (req, res) => {
    const persona = req.body
    if (persona.id) {
        const index = datos.findIndex(p => p.id === persona.id)
        if (index !== -1) {
            datos[index] = {...datos[index], ...persona, actualizado: datos[index].actualizado + 1}
            if (persona.borrado) {
                datos[index].borrado = true
            }
            return res.status(201).json(datos[index])
        }else{
            return res.status(404).send({})
        }
    }else{
        const newId = datos.length ? Math.max(...datos.map(p => p.id)) + 1 : 1
        const nuevaPersona = {...persona, id: newId, borrado: false, actualizado: 1}
        datos.push(nuevaPersona)
        return res.status(201).json(nuevaPersona)
    }
})


export default app