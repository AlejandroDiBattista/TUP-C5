let usuarios = [
    { user: "matias", password: "admin" }
]


const login = (req, res) => {
    let { user, password } = req.body;

    if (user == usuarios[0].user && password == usuarios[0].password) {
        res.send("Bienvenido");
    } else {
        res.send("Usuario o contraseña incorrectos");
    }

}



export default { login };