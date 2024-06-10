import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

let datos = [
  { id: 1, nombre: "Nico", apellido: "Gonzalez", edad: 29, borrado: false, actualizado: 1 },
  { id: 2, nombre: "Alex", apellido: "Rodriguez", edad: 19, borrado: false, actualizado: 1 },
  { id: 3, nombre: "Axel", apellido: "Carrizo", edad: 37, borrado: false, actualizado: 1 },
  { id: 4, nombre: "Abel", apellido: "Aguirre", edad: 18, borrado: false, actualizado: 1 },
  { id: 5, nombre: "Alfonsina", apellido: "Storni", edad: 42, borrado: false, actualizado: 1 },
]

app.get('/personas', (req, res) => {
  // Implementar GET_ALL
  const personasNoBorradas = datos.filter(persona => !persona.borrado)
  res.status(200).send(personasNoBorradas)
})

app.put('/personas', (req, res) => {
  const { id, nombre, apellido, edad } = req.body
  const idPersona = datos.findIndex(i => i.id === id)

  if (idPersona !== -1) {
    datos[idPersona] = {...datos[idPersona], nombre, apellido, edad, borrado: true, actualizado: 1}
    res.status(201).send(datos[idPersona])
  }

  else if (id === undefined) {
    const Id = datos.length + 1
    const persona = { id: Id, nombre, apellido, edad, borrado: false, actualizado: 1 }
    datos.push(persona)
    res.status(201).send(persona)
  }
  else {
    res.send(404)
  }
})

export default app
