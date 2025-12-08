import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
const app = express();

app.use(morgan('dev'));     // Loggea cada request en consola
app.use(cookieParser());    // Para leer cookies
app.use(express.json());    // Para leer JSONs
app.use(express.static('public'));  // Para servir archivos estáticos

let usuariosRegistrados = [
    {usuario:"Isabel", contraseña:"wa"}
]

app.post("/registro", (req, res)=>{   
    let nuevoUsuario = req.body
    const usuarioExiste = usuariosRegistrados.some(u => u.usuario === nuevoUsuario.usuario)
    
    if(usuarioExiste){
        res.json({me:"Este usuario ya esta registrado"})
    }
    
    else {
        usuariosRegistrados.push(nuevoUsuario)
        res.json({me:"usuario registrado con exito", array:usuariosRegistrados})
    }
})

app.post("/login", (req, res) =>{
    let usuarioLogueado = req.body
    const usuarioRegistrado = usuariosRegistrados.some(u => u.usuario === usuarioLogueado.usuario && u.contraseña === usuarioLogueado.contraseña)
    
    function generarCookieUnica() {
        return Math.random().toString(36).substr(2, 10);
    }
    let cookie = generarCookieUnica()

    if(usuarioRegistrado) {
        res.cookie("cookieSesion", cookie)
        res.status(200).json({me:"logueado", logueado:true})
    }

    else {
        res.json({me:"usuario o contraseña inexistente", logueado:false})
    }
})

app.put("/logout", (req,res) => {
    res.clearCookie("cookieSesion")
    res.json({me:"sesion cerrada"})
})

// Implementar las rutas necesarias
app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});
