import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

let datos = [
  {
    id: 1,
    nombre: "Juan",
    apellido: "Fernandez",
    edad: 28,
    borrado: false,
    actualizado: Date.now(),
  },
  {
    id: 2,
    nombre: "Sofia",
    apellido: "Gonzalez",
    edad: 34,
    borrado: false,
    actualizado: Date.now(),
  },
  {
    id: 3,
    nombre: "Diego",
    apellido: "Rodriguez",
    edad: 41,
    borrado: false,
    actualizado: Date.now(),
  },
  {
    id: 4,
    nombre: "Camila",
    apellido: "Hernandez",
    edad: 26,
    borrado: false,
    actualizado: Date.now(),
  },
  {
    id: 5,
    nombre: "Mateo",
    apellido: "Martinez",
    edad: 30,
    borrado: false,
    actualizado: Date.now(),
  },
];

app.get("/personas", (req, res) => {
  // Devuelve todas las personas no borradas
  const personas = datos.filter((persona) => !persona.borrado);
  res.status(200).json(personas);
});

app.put("/personas", (req, res) => {
  const persona = req.body;

  if (persona.id) {
    // Actualizar o borrar una persona
    const index = datos.findIndex((p) => p.id === persona.id);
    if (index === -1) {
      res.status(404).send("Persona no encontrada");
    } else {
      datos[index] = { ...datos[index], ...persona, actualizado: Date.now() };
      res.status(201).json(datos[index]);
    }
  } else {
    // Crear una nueva persona
    const nuevaPersona = {
      id: datos.length ? datos[datos.length - 1].id + 1 : 1,
      ...persona,
      borrado: false,
      actualizado: Date.now(),
    };
    datos.push(nuevaPersona);
    res.status(201).json({ id: nuevaPersona.id });
  }
});

export default app;
