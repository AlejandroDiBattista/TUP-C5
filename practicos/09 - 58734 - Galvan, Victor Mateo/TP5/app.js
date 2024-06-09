import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

const personas = [
  { id: 1, nombre: "Andrés", apellido: "Iniesta", edad: 39, borrado: false, actualizado: Date.now() },
  { id: 2, nombre: "Xavi", apellido: "Hernández", edad: 43, borrado: false, actualizado: Date.now() },
  { id: 3, nombre: "Gerard", apellido: "Piqué", edad: 37, borrado: false, actualizado: Date.now() },
  { id: 4, nombre: "Sergio", apellido: "Busquets", edad: 35, borrado: false, actualizado: Date.now() },
  { id: 5, nombre: "Iker", apellido: "Casillas", edad: 42, borrado: false, actualizado: Date.now() },
];


app.get("/personas", (req, res) => {
  const personasActivas = personas.filter(persona => !persona.borrado);
  res.status(200).json(personasActivas);
});


app.put("/personas", (req, res) => {
  const { id, nombre, apellido, edad, borrado } = req.body;

  if (id) {
    const persona = personas.find(p => p.id === id);
    if (persona) {
      if (typeof borrado !== 'undefined') {
        persona.borrado = borrado;
      } else {
        persona.nombre = nombre;
        persona.apellido = apellido;
        persona.edad = edad;
      }
      persona.actualizado = Date.now();
      res.status(200).json(persona);
    } else {
      res.status(404).send("Persona no encontrada");
    }
  } else {
    const nuevaPersona = {
      id: personas.length ? personas[personas.length - 1].id + 1 : 1,
      nombre,
      apellido,
      edad,
      borrado: false,
      actualizado: Date.now(),
    };
    personas.push(nuevaPersona);
    res.status(201).json({ id: nuevaPersona.id });
  }
});

export default app;
