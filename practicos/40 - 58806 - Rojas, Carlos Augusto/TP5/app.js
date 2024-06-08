import express from 'express'
import cors from 'cors'

const App = express()

App.use(express.json());
App.use(cors())

const datos = [
    // Datos de ejemplo
    {id:1 , nombre: "Juan", apellido: "Teseira", edad: 20, borrado: false, actualizado: 1},   
    {id: 2, nombre: "Juan", apellido: "Perez", edad: 30, borrado: false, actualizado: 1},
    {id: 3, nombre : 'Ricardo', apellido: 'Ricardo', edad: 22, borrado: false, actualizado: 1},
    {id: 4, nombre : 'Rolo' , apellido: 'Rodriguez', edad: 23, borrado: false, actualizado: 1},
    {id: 5, nombre : 'Rome' , apellido: 'Rome', edad : 18,borrado: false, actualizado: 1}
    
]
let contador = datos.length

App.get('/personas', (req, res) => {
  const datosBorrados= datos.filter(p=>p.borrado === false)
  res.json(datosBorrados)

});

App.put('/personas', (req, res) => {
    // Implementar PUT
    const persona = req.body

    if(!persona.id){
        persona.id = contador++
        persona.borrado = false
        persona.actualizado = 1
        datos.push(persona)
        return res.status(201).send({id:persona.id})
    }
    else{
        const index = datos.findIndex(p => p.id === persona.id)
        if(index !== -1){
            datos[index] = {...datos[index], ...persona}
            return res.status(201).json(datos[index])
        }
        else{
            
            res.status(404).send()
        }
        
        

    }
})

export default App