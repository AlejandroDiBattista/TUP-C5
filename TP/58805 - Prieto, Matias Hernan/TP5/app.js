import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json());
app.use(cors())

let datos = [
        {
            "id": 1,
            "nombre": "Juan",
            "apellido": "Pérez",
            "edad": 30,
            "borrado": false,
            "actualizado": 1
        },
        {
            "id": 2,
            "nombre": "María",
            "apellido": "González",
            "edad": 25,
            "borrado": false,
            "actualizado": 1
        },
        {
            "id": 3,
            "nombre": "Carlos",
            "apellido": "Rodríguez",
            "edad": 40,
            "borrado": false,
            "actualizado": 1
        },
        {
            "id": 4,
            "nombre": "Laura",
            "apellido": "Martínez",
            "edad": 22,
            "borrado": false,
            "actualizado": 1
        },
        {
            "id": 5,
            "nombre": "Pedro",
            "apellido": "López",
            "edad": 28,
            "borrado": false,
            "actualizado": 1
        }
]

app.get('/personas', (req, res) => {
    res.json(datos) 
});

app.put('/personas', (req, res) => {
    const persona = req.body;
    if(persona.borrado === true){
        const ver = datos.findIndex(d=> d.id === persona.id)
        const personaBorrada = datos[ver]
        datos = datos.filter(d => d.id !== persona.id);
        return res.status(200).json({ ...personaBorrada, borrado: true })
    }
    if(persona.id){
       const ver = datos.findIndex(d=> d.id === persona.id)
       if(ver<0){
        return res.status(404).json({ error: "Persona no encontrada" })
       }else{
        datos[ver] = {...datos[ver], ...persona} 
        return res.status(201).json(datos[ver])
       }
    }else{
    const index = datos.length + 1
    const copia = {id: index, ...persona}
    datos.push(copia)
    return res.status(201).json({id: index})
    }
})

export default app