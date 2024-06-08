import express from 'express'
import cors from 'cors'
const app = express()
app.use(express.json());
app.use(cors())

let datos = [
 
    {id:1,nombre:"Lionel",apellido:"Messi",edad:36 ,borrado:false,actualizado:1},
    {id:2,nombre:"Alejandro",apellido:"Garnacho",edad:19 ,borrado:false,actualizado:1},
    {id:3,nombre:"Miguel",apellido:"Merentiel",edad:32 ,borrado:false,actualizado:1},
    {id:4,nombre:"Zinedin",apellido:"Zenon",edad:19 ,borrado:false,actualizado:1},
    {id:5,nombre:"Cristiano",apellido:"Ronaldo",edad:38 ,borrado:false,actualizado:1}
]

app.get('/personas', (req, res) => {
    // Implementar GET_ALL
   res.send(datos.filter(d=>!d.borrado))
});

app.put('/personas', (req, res) => {
    // Implementar PUT
   const persona= req.body
   if(persona.id){
    let buscarPers= datos.findIndex(d=>d.id===persona.id)
    if(buscarPers<0){
        return res.status(404).send()
    }
    else{
       datos[buscarPers]={...datos[buscarPers],...persona}
       return res.status(201).send(datos[buscarPers])}          
   }
   else{
    const id=Math.max(...datos.map(d=> d.id))+1
    persona.id=id
    persona.borrado=false
    persona.actualizado=1
    datos.push(persona)
    return res.status(201).send(persona)}
})