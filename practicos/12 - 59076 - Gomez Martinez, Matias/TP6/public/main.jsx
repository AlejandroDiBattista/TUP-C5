



function App() {

    async function login() {

        let usuario = document.getElementById("user").value;
        let contraseña = document.getElementById("pass").value;


        if (usuario != null && contraseña != null) {

            let res = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: usuario,
                    password: contraseña,
                })
            })

            console.log(res.text());


        } else {

            console.log('no pasa nada');
            // alert("Ingrese usuario y contraseña");

        }

    }
    return (
        <div>
            <section>
                <div className="form">
                    <h2>Inicio de sesion</h2>
                    <label>
                        <input type='text' id="user" placeholder="Usuario" />
                    </label>
                    <label >
                        <input type='text' id="pass" placeholder='Contraseña' />
                    </label>
                    <span>
                        <button type="" onClick={() => login()}>ingresar</button>
                        <button type="">Registrarse</button>
                    </span>
                </div>
            </section>
        </div>
    )
}