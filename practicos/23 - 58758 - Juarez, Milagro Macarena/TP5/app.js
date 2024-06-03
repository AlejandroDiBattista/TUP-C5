import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json());
app.use(cors())

let datos = [
    // Datos de ejemplo   
]

app.get('/personas', (req, res) => {
    // Implementar GET_ALL
});

app.put('/personas', (req, res) => {
    // Implementar PUT
})

export default app