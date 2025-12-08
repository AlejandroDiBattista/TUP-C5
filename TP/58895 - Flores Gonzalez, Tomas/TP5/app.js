import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json());
app.use(cors())

let datos = [
    // Datos de ejemplo
   {id: 1, nombre: 'Luis', apellido: 'Flores', edad: 38, borrado: false, actualizado: 1},
   {id: 2, nombre: 'Lorena', apellido: 'Gonzalez', edad: 41, borrado: false, actualizado: 2},
   {id: 3, nombre: 'Agustin', apellido: 'Paz', edad: 21, borrado: false, actualizado: 3},
   {id: 4, nombre: 'Lucas', apellido: 'Ibanez', edad: 22, borrado: false, actualizado: 4},
   {id: 5, nombre: 'Alejo', apellido: 'Perez', edad: 23, borrado: false, actualizado: 5}
]

let idActual = datos.length + 1

app.get('/personas', (req, res) => {
    // Implementar GET_ALL
    const personasNoBorradas = datos.filter(p => !p.borrado)
    res.send(personasNoBorradas)
    res.send(datos)
});

app.put('/personas', (req, res) => {
    const persona = req.body

    if (persona.id) {
        const indice = datos.findIndex(p => p.id === persona.id)

        if (indice === -1) {
            return res.status(404).send()
        }

       
        datos[indice] = { ...datos[indice], ...persona}
        return res.status(201).json(datos[indice])
        
    } else {
        persona.id = idActual++
        persona.borrado = false
        persona.actualizado = 1

        datos.push(persona)

        return res.status(201).json(persona)
    }
});

export default app;