import express from 'express';
import morgan from 'morgan';

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(express.static('a'));

app.get('/', (req, res) => {
    res.send('<html><head></head><body><h1>Hello World!</h1></body></html>');
});

app.get('/saludo', (req, res) => {
    res.json({ mensaje: 'Estoy en saludo!' + req.params.nombre, hora: new Date()  });	    
})

app.post("/saludo", (req, res) => {
    res.json({ mensaje: 'Hola Mundo!'});
});

app.listen(3000, () => {
    console.log('Servidor en el puerto 3000');
});
