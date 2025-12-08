import express from 'express'
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(cors());

let datos = [
    // Datos de ejemplo   
    {id: 1, nombre: 'Juan', apellido: 'Perez', edad: 30, borrado: false, actualizado: 1},
    {id: 2, nombre: 'Paula', apellido: 'Garcia', edad: 35, borrado: false, actualizado: 2},
    {id: 3, nombre: 'Felipe', apellido: 'Pascal', edad: 20, borrado: false, actualizado: 3},
    {id: 4, nombre: 'Geraldine', apellido: 'Villalba', edad: 26, borrado: false, actualizado: 4},
    {id: 6, nombre: 'Mali', apellido: 'Peraya', edad: 27, borrado: false, actualizado: 5},
    {id: 5, nombre: 'Pedro', apellido: 'Lazarte', edad: 46, borrado: false, actualizado: 6},
]

let idNuevo=datos.length + 1;

app.get('/personas', (req, res) => {
    // Implementar GET_ALL
    const persNoBorrar=datos.filter(p=> !p.borrado);
    res.send(persNoBorrar);

    res.send(datos)
});

app.put('/personas', (req, res) => {
    // Implementar PUT
    const persona= req.body;

    if(persona.id){
        const indice=datos.findIndex(pers => pers.id === persona.id)

        if(indice === -1){
            return res.status(404).send()
        }
        datos [indice]={...datos[indice], ...persona}
        return res.status(201).json(datos[indice])
    } else{
        persona.id=idNuevo++;
        persona.borrado=false;
        persona.actualizado= 1;

        datos.push(persona);
        res.status(201).json(persona);
    } 
})

export default app