const { useState, useEffect } = React;

const ProductosIniciales = [
    { id: 1, producto: '7up', EAN: '7799876543210', cantidad: 7 },
    { id: 2, producto: 'Coca Cola', EAN: '7798765432109', cantidad: 10 },
    { id: 3, producto: 'Pepsi', EAN: '7797654321098', cantidad: 5 },
    { id: 4, producto: 'Fanta', EAN: '7796543210987', cantidad: 12 },
    { id: 5, producto: 'Sprite', EAN: '7795432109876', cantidad: 8 }
];

function Editar({ producto, alGuardar, alCancelar }) {
    const [nombre, setNombre] = useState(producto.producto);
    const [EAN, setEAN] = useState(producto.EAN);
    const [cantidad, setCantidad] = useState(producto.cantidad);
    const [error, setError] = useState(false);

    const cambiarNombre = e => {
        setNombre(e.target.value);
        setError(false);
    };
    const cambiarEAN = e => {
        setEAN(e.target.value);
        setError(false);
    };
    const cambiarCantidad = e => {
        setCantidad(e.target.value);
        setError(false);
    };

    const guardar = e => {
        e.preventDefault();
        if (nombre.trim() === '' || EAN.trim() === '' || cantidad === '') {
            setError(true);
            return;
        }
        alGuardar({ ...producto, producto: nombre, EAN, cantidad });
    };
    const cancelar = e => {
        e.preventDefault();
        alCancelar();
    };
    return (
        <form className="update-form">
            <div className="container-input">
                <input type="text" value={nombre} onChange={cambiarNombre} placeholder="Producto" />
                <input type="text" value={EAN} onChange={cambiarEAN} placeholder="EAN" />
                <input type="text" value={cantidad} onChange={cambiarCantidad} placeholder="Cantidad" />
            </div>
            <div className="container-buttons">
                <button className="general" onClick={guardar}>Aceptar</button>
                <button className="general" onClick={cancelar}>Cancelar</button>
            </div>
            {/* <div className="error">
                {error && <p className="error">Todos los campos son obligatorios</p>}
            </div> */}
        </form>
    );
}

function Producto({ producto, alEditar, alBorrar, alGuardar, alCancelar }) {
    const [editando, setEditando] = useState(producto.editando);

    const handleEditar = () => setEditando(true);
    const handleGuardar = (productoActualizado) => {
        alGuardar(productoActualizado);
        setEditando(false);
    };
    const handleCancelar = () => {
        setEditando(false);
        alBorrar();
    };

    return editando ? (
        <Editar producto={producto} alGuardar={handleGuardar} alCancelar={handleCancelar} />
    ) : (
        <div className="card-product">
            <div className="data">
                <p className="quantity">{producto.cantidad}</p>
            </div>
            <div className="data">
                <h2 className="name">{producto.producto}</h2>
                <p className="ean">{producto.EAN}</p>
            </div>
            <div className="data">
            
                <button className="icono" onClick={handleEditar}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                    </svg>
                </button>

                <button className="icono" onClick={() => alBorrar(producto.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                    </svg>
                </button>

            </div>
        </div>
    );
}

function Agenda({ productos, alGuardar, alBorrar, alCancelar }) {
    return (
        <>
            
            {productos.length === 0 && <h2 className="subtitle">No hay productos</h2>}

            {productos.map(producto => (
                <Producto
                    key={producto.id}
                    producto={producto}
                    alEditar={() => alGuardar(producto.id)}
                    alBorrar={alBorrar}
                    alGuardar={alGuardar}
                    alCancelar={alCancelar}
                />
            ))}
        </>
    );
}

function App() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const productosGuardados = localStorage.getItem('productos');
        if (productosGuardados) {
            setProductos(JSON.parse(productosGuardados));
        } else {
            setProductos(ProductosIniciales);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('productos', JSON.stringify(productos));
    }, [productos]);

    const guardarProducto = (productoActualizado) => {
        setProductos(productos.map(p => p.id === productoActualizado.id ? productoActualizado : p));
    };

    const cancelarEdicion = () => {
    };

    const agregarProducto = () => {
        const nuevoProducto = {
            id: Date.now(),
            producto: '',
            EAN: '',
            cantidad: 0,
            editando: true
        };
        setProductos([...productos, nuevoProducto]);
    };

    const borrarProducto = (id) => {
        setProductos(productos.filter(p => p.id !== id));
    };

    return (
        <div className="row">
            <div className="col-12 container-title">
                <h1 className="title">Control Deposito</h1>
                <div type="button" className="add-product" onClick={agregarProducto}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                    </svg>
                </div>
            </div>
            <div className="col-12 container-card">
                <Agenda
                    productos={productos}
                    alGuardar={guardarProducto}
                    alBorrar={borrarProducto}
                    alCancelar={cancelarEdicion}
                />
            </div>
            
        </div>
        
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);