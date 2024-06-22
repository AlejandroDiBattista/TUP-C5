import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json());
app.use(cors())

let datos = [
    // Datos de ejemplo  
    {id:1,nombre:'Lucas',apellido:'Hindi', edad:21, borrado:false, actualizado: 1},
    {id:2,nombre:'Romina',apellido:'Guzmam', edad:22, borrado:false, actualizado: 2}, 
    {id:3,nombre:'Martin',apellido:'Perez', edad:27, borrado:false, actualizado: 3},
    {id:4,nombre:'Miguel',apellido:'Gomez', edad:31, borrado:false, actualizado: 4},
    {id:5,nombre:'Victoria',apellido:'Ponce', edad:26, borrado:false, actualizado: 5},
    {id:1,nombre:'Maria',apellido:'Juarez', edad:25, borrado:false, actualizado: 6},
]
let idActual=datos.length+1;

app.get('/personas', (req, res) => {
    // Implementar GET_ALL}
    //retonar un JSON
    const personasNoBorradas = datos.filter(persona => !persona.borrado);
    res.json(personasNoBorradas);
    res.send(datos)
});

app.put('/personas', (req, res) => {
    // Implementar PUT
   
    const persona=req.body
    
    if (persona.id){
     const indice=datos.findIndex(p => p.id===persona.id)
    

    if (indice===-1){
        return res.status(404).send()
    }
    datos[indice] = {...datos[indice], ...persona}
    return res.status(201).json(datos[indice])
    }else{
        persona.id=idActual++
        persona.borrado=false
        persona.actualizado=1

        datos.push(persona)

       return res.status(201).json({id:persona.id})
    }
})

export default app