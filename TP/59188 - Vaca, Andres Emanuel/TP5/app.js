import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json());
app.use(cors())

let datos = [
    // Datos de ejemplo  
        { id: 1, nombre: "Ana", apellido: "García", edad: 25, borrado: false, actualizado: 1 },
        { id: 2, nombre: "Juan", apellido: "Pérez", edad: 30, borrado: false, actualizado: 1 },
        { id: 3, nombre: "María", apellido: "López", edad: 22, borrado: false, actualizado: 1 },
        { id: 4, nombre: "Carlos", apellido: "Martínez", edad: 28, borrado: false, actualizado: 1 },
        { id: 5, nombre: "Luis", apellido: "Rodríguez", edad: 35, borrado: false, actualizado:1 }    
]

let idActual = datos.length + 1

app.get('/personas', (req, res) => {
    //Implementar GET_ALL
    const personasNoBorradas = datos.filter(p => !p.borrado);
    res.send(personasNoBorradas);
    res.send(datos)
})

app.put('/personas', (req, res) => {
    //Implementar SET
    const persona = req.body
    if (persona.id) {
        const indice = datos.findIndex(p => p.id === persona.id)
        if (indice === -1) {
            return res.status(404).send()
        }
        datos[indice] = { ...datos[indice], ...persona }
        return res.status(201).json(datos[indice])
    } else {
        persona.id = idActual++
        persona.borrado = false
        persona.actualizado = 1
        datos.push(persona)
        return res.status(201).json(persona)
    }
})

export default app