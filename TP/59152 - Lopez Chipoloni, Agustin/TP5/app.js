import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

let datos = [
    {id:1, nombre:"juan", apellido:"lopez", edad:23, borrada: false, actualizado: Date.now()},
    {id:2, nombre:"ramon", apellido:"juarez", edad:17, borrada: false, actualizado: Date.now()},
    {id:3, nombre:"micaela", apellido:"corina", edad:33, borrada: false, actualizado: Date.now()},
    {id:4, nombre:"samuel", apellido:"garcia", edad:20, borrada: false, actualizado: Date.now()},
    {id:5, nombre:"sofia", apellido:"peralta", edad:19, borrada: false, actualizado: Date.now()},
    {id:6, nombre:"karen", apellido:"salazar", edad:26, borrada: false, actualizado: Date.now()},

]

app.get('/personas', (req, res) => {
    // Implementar GET_ALL
    res.status(200).json(datos.filter(personas => !personas.borrada));
});

app.put('/personas', (req, res) => {
    // Implementar PUT
    const { id, nombre, apellido, edad, borrada } = req.body;
    let personas = datos.find(p => p.id === id);

    if (id && personas) {
        Object.assign(personas, {
            nombre: nombre || personas.nombre,
            apellido: apellido || personas.apellido,
            edad: edad !== undefined ? edad : personas.edad,
            borrada: borrada !== undefined ? borrada : personas.borrada,
            actualizado: Date.now()
        });
        return res.status(201).json(personas);
    } else if (!id) {
        const nuevoId = datos.length ? Math.max(...datos.map(p => p.id)) + 1 : 1;
        const Personanueva = {
            id: nuevoId,
            nombre,
            apellido,
            edad,
            borrada: false,
            actualizado: Date.now()
        };
        datos.push(Personanueva);
        return res.status(201).json({ id: Personanueva.id });
    } else {
        return res.status(404).json({ mensaje: 'Persona no encontrada' });
    }
}
)

export default app