import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json());
app.use(cors())

let datos = [
    // Datos de ejemplo
    {id: 1, nombre: 'Jesicca', apellido:'Cirio', borrado:false, actualizado:3, edad:39},
    {id: 2, nombre: 'Nicole', apellido:'Neuman', borrado:false, actualizado:3, edad:43},
    {id: 3, nombre: 'Adabel', apellido:'Guerrero', borrado:false, actualizado:3, edad:45},
    {id: 4, nombre: 'Flor', apellido:'de la V', borrado:false, actualizado:3, edad:49},
    {id: 5, nombre: 'Luciana', apellido:'Zalazar', borrado:false, actualizado:3, edad:43}

]
let idActual=datos.length +1;
app.get('/personas', (req, res) => {
    // Implementar GET_ALL
    const personasNoBorradas=datos.filter(p=>!p.borrado)
    res.send(personasNoBorradas);
    res.send(datos)
});

app.put('/personas', (req, res) => {
    // Implementar PUT
    const persona= req.body;
    if (persona.id) {
        const indice = datos.findIndex(p=>p.id ===persona.id)
        
        if (indice === -1){
            return res.status(404).send();
        }

        datos [indice] ={...datos[indice], ...persona}
        return res.status(201).json(datos[indice])
    }else{
        persona.id = idActual++
        persona.borrado = false
        persona.actualizado = 1
        datos.push(persona)
        return res.status(201).json(persona)
    }
    
    
})

export default app