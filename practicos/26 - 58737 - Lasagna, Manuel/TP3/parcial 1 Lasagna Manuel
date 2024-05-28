# TP3 - 1° Parcial

## App: Control de Depósito
---
La fecha límite de entrega es:

Comisión 3: **Miercoles 22, 23:59hs**
Comisión 4: **Lunes 27,     23:59hs**
Comisión 5: **Lunes 27,     23:59hs**
Comisión 9: **Miercoles 22, 23:59hs**

---

#### Instrucciones para la presentación del trabajo:

1. Bajar la última versión del repositorio del curso. (fetch)
2. Crear una nueva rama para tus cambios (new branch) (recomiendo TP3-{alumno}).
3. Abrir la carpeta correspondiente a tu nombre de usuario (practicos/{alumno}/tp3).
4. Realizar las modificaciones dentro de la carpeta TP3 (sin alterar ninguna otra carpeta).
5. Confirmar los cambios (commint)
5. Realizar un solicitud de publicación (pull request).
6. Volver a la rama principal (main) para actualizar (fetch) el repositorio.

<html lang="es">

<head>
    <meta charset="UTF-8">
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
        body {
            font-family: 'Baloo', cursive;
            color: rgb(255, 255, 255);
            margin: 0;
            padding: 0;
            background-image: url('https://mrwallpaper.com/images/high/cr7-colorful-portrait-dgeqeur07ebd1xn5.jpg');
            background-size: cover;
            height: 100%;
            display: flex;
            justify-content: center;
         
        }

        #root {
            padding: 20px;
            margin: 0 auto;
        }

        h1 {
            font-size: 30px;
            margin-bottom: 10px;
            text-align: center;
            font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
        }

        p {
            font-size: 16px;
            margin-bottom: 10px;
        }

        li {
            font-size: 10px;
            margin-bottom: 10px;
        }

        .panel {
            width: 500px;
            border: 3px solid #ccc;
            background-color: #202020;
            border-radius: 10px;
            padding: 1px;
            margin-bottom: 5px;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
            display: flex;
        }
        
        label {
            flex-wrap: wrap;
            display: block;
            font-size: 10px;
            color: #fff7f7;
            margin-bottom: 1px;
        }

        input {
            width: 110%;
            padding: 5px;
            margin-bottom: 10px;
            font-size: 16px;
            
        }

        .acciones {
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
        }

        button {
            padding: 6px 10px;
            font-size: 16px;
            border: 2px solid white;
            border-radius: 10px;
            background-color: #000000;
            color: #ffffff;
            cursor: pointer;
            margin-right: 10px;
        }

        button:hover{
            transform: translate(-5px);
            border-color: lightgray;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .error {
            color: red;
            font-size: 15px;
        }
    </style>
</head>

<body>
    <div id="root"></div>
    <script type="text/babel">
        const { useState } = React

        const almacenesIniciales = [
            {id: 1, producto: 'COCA COLA', cantidad: '7', codigo: '02010'},
            {id: 2, producto: 'COCA ZERO', cantidad: '9', codigo: '91615'},
            {id: 3, producto: 'PEPSI', cantidad: '3', codigo: '74640'},
            {id: 4, producto: 'FANTA', cantidad: '2', codigo: '49049'},
            {id: 5, producto: 'SPRITE', cantidad: '2', codigo: '87053'},
            {id: 6, producto: 'MIRINDA', cantidad: '5', codigo: '85006'},
            {id: 7, producto: 'SECCO (NAR)', cantidad: '5', codigo: '74161'},
            {id: 8, producto: 'TORASSO (POM)', cantidad: '6', codigo: '799496'},
            {id: 9, producto: 'QUILMES', cantidad: '6', codigo: '56469'},
            {id: 10, producto: 'NORTE', cantidad: '7', codigo: '01102'},
            {id: 11, producto: 'SALTA (NEG)', cantidad: '11', codigo: '90271'},
            {id: 12, producto: 'SODA', cantidad: '15', codigo: '60496'},
            {id: 13, producto: 'FRESH MIX', cantidad: '14', codigo: '37949'},
            {id: 14, producto: 'LIMONADA', cantidad: '12', codigo: '20463'},
            {id: 15, producto: 'MANAOS UVA', cantidad: '9', codigo: '97946'}

        ]

        function Editar({ almacen, alGuardar, alCancelar }) {
            let [producto, setproducto] = useState(almacen.producto)
            let [cantidad, setcantidad] = useState(almacen.cantidad)
            let [codigo, setcodigo] = useState(almacen.codigo)
            let [error, setError] = useState(false)

            const cambiarproducto = e => {
                setproducto(e.target.value)
                setError(false)
            }
            const cambiarcantidad = e => {
                setcantidad(e.target.value)
                setError(false)
            }
            const cambiarcodigo = e => {
                setcodigo(e.target.value)
                setError(false)
            }

            const guardar = e => {
                e.preventDefault()
                if (producto.trim() === '' || cantidad.trim() === '' || codigo.trim() === '') {
                    setError(false)
                    return
                }
                alGuardar({ ...almacen, producto, cantidad, codigo })
            }
            const cancelar = e => {
                e.preventDefault()
                alCancelar()
            }
            return <>
                <form className="panel">
                    <label> PRODUCTO</label>
                    <input type="text" value={producto} onChange={cambiarproducto} />
                    <label> CODIGO </label>
                    <input type="text" value={codigo} onChange={cambiarcodigo} />
                    <label> CANT </label>
                    <input type="text" value={cantidad} onChange={cambiarcantidad} />
                    {error && <p className="error">Todos los campos son obligatorios</p>}
                    <div className="acciones">
                        <button onClick={guardar}>Guardar</button>
                        <button onClick={cancelar}>Cancelar</button>
                    </div>
                </form>
            </>
        }

        function Mostrar({ almacen, alEditar, alBorrar }) {
            const editar = (e) => alEditar()
            const borrar = (e) => alBorrar()
            return <>
             <p></p>
             <p></p>
             <p></p>
                <div className="panel">
                    <p><strong>PRODUCTO:</strong> {almacen.producto}</p>
                    <p><strong>CANT: </strong> {almacen.cantidad}</p>
                    <p><strong>CODIGO:</strong> {almacen.codigo}</p>
                    <div className="acciones">
                        <button onClick={editar}>Editar</button>
                        <button onClick={borrar}>Borrar</button>
                    </div>
                </div>
            </>
        }
       
        function Agenda({almacenes, alAgregar, alEditar, alBorrar}){
            if(almacenes.length === 0)
                return <h1>No hay nada en el almacen</h1>

            return <>
                <h1>DISTRUBUIDORA MI COMANDANTE </h1>
                <h2> CONTROL DE STOCK </h2>
                <button onClick={()=>alAgregar()}>Agregar</button>
                
                {almacenes.map(almacen => 
                    <Mostrar almacen={almacen} 
                        alEditar={()=>alEditar(almacen.id)}
                        alBorrar={()=>alBorrar(almacen.id)}/>
                )}
                    
           </>
        }

        function ordenAlfabetico(a, b){
            if(a.cantidad < b.cantidad) return -1
            if(a.cantidad > b.cantidad) return +1

            if(a.producto < b.producto) return -1
            if(a.producto > b.producto) return +1
            
            return 0
        }


      

        function App() {
            let [almacen, setalmacen] = useState({})
            let [editando, setEditando] = useState(false)
            let [almacenes, setalmacenes] = useState(almacenesIniciales)

            const guardar = (almacen) => {
                if(almacen.id){
                   
                    let copia = almacenes.map(c => c.id === almacen.id ? almacen : c)
                    setalmacenes(copia)
                } else {
                     
                    let id = Math.max(...almacenes.map(c => c.id)) + 1
                    let copia = [...almacenes, {...almacen, id}]
                    setalmacenes(copia)
                }
                setEditando(false)
            }

            const cancelar = () => {
                setalmacen({})
                setEditando(false)
                console.log("Cancelar")
            }

            const agregar = () => {
                setalmacen({})
                setEditando(true)
            }

            const editar = (id) => {
                let almacen = almacenes.find(c => c.id === id)
                setalmacen(almacen)
                setEditando(true)
            }

            const borrar = (id) => {
            
                let copia = almacenes.filter(c => c.id !== id)
                setalmacenes(copia)
            }

            almacenes.sort(ordenAlfabetico)
            return <>
                {editando
                    ? <Editar almacen={almacen} alGuardar={guardar} alCancelar={cancelar} />
                    : <Agenda almacenes={almacenes} 
                            alAgregar={agregar}
                            alEditar={editar} 
                            alBorrar={borrar}/>
                }
            </>
        }

        const root = ReactDOM.createRoot(document.getElementById('root'))
        root.render(<App />);
    </script>
</body>

</html>
