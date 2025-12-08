import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json());
app.use(cors())

let datos = [
    {id: 1, nombre:"Maria", apellido:"Rivadeneira", edad: 20, borrado: false, actualizado: 1},
    {id: 2, nombre:"Sofia", apellido:"Diaz", edad: 27, borrado: false, actualizado: 1},
    {id: 3, nombre:"Luisa", apellido:"Martinez", edad: 28, borrado: false, actualizado: 1},
    {id: 4, nombre:"Mariano", apellido:"Lopez", edad: 30, borrado: false, actualizado: 1},
    {id: 5, nombre:"Jazmin", apellido:"Rodriguez", edad: 29, borrado: false, actualizado: 1},
    {id: 6, nombre:"Luciano", apellido:"Galan", edad: 50, borrado: false, actualizado: 1},
    {id: 7, nombre:"Rodrigo", apellido:"Nanni", edad: 12, borrado: false, actualizado: 1}
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