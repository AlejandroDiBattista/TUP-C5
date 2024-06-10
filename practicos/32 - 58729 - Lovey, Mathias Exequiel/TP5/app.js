import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json());
app.use(cors())

let datos = [
    // Datos de ejemplo 
    {id: 1, nombre:'Messi', apellido:'Kpo', edad:36, borrado: false, actualizado: 1},
    {id: 2, nombre:'Juan', apellido:'Guarnizo', edad:37, borrado: false, actualizado: 2},  
    {id: 3, nombre:'Lucas', apellido:'Rodriguez', edad:38, borrado: false, actualizado: 3},  
    {id: 4, nombre:'Martin', apellido:'Perez', edad:39, borrado: false, actualizado: 4},  
    {id: 5, nombre:'Joaquin', apellido:'Lopez', edad:40, borrado: false, actualizado: 5}  

]
let idUnico = datos.length + 1;
app.get('/personas', (req, res) => {
    // Implementar GET_ALL
    const personasNB = datos.filter(p => !p.borrado)
    res.send(personasNB)
    res.send(datos)

    res.send('ok')
});

app.put('/personas', (req, res) => {
    // Implementar PUT
    const persona = req.body
    if (persona.id){
        const lista = datos.findIndex(p=> p.id === persona.id)
    
    if(lista ===-1){
        return res.status(404).send()
    }
    datos[lista]={...datos[lista], ...persona}
    return res.status(201).json(datos[lista])
} else{
    persona.id = idUnico++
    persona.borrado = false
    persona.actualizado = 1
    datos.push(persona)
    return res.status(201).json(persona)
}
})

export default app