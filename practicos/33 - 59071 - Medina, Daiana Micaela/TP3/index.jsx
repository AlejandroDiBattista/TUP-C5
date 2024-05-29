const { useState, useEffect } = React;

const productosIniciales = [];

const validacionProducto = (nombre, cantidad, ean) => {
    if (nombre === '' || nombre === null || cantidad === null || cantidad === '') {
        alert("Debes completar todos los campos.");
        return false;
    }

    if (cantidad < 0) {
        alert("La cantidad no puede ser negativa.");
        return false;
    }

    if (cantidad > 100) {
        alert("Excedió la cantidad de unidades.");
        return false;
    }

    if (cantidad === 0) {
        alert("Debes establecer una cantidad.");
        return false;
    }

    if (ean <= 7790000000000 || ean >= 7799999999999) {
        alert("El código debe tener 13 dígitos y empezar con 779.");
        return false;
    }
    return true;
}

const Titulo = ({ onAgregarProducto }) => (
    <div className="titulo">
        <div className="titulo1">
            <h1>Control Depósito</h1>
        </div>
        <button className="boton3" onClick={onAgregarProducto}>
            <img className="iconoAgregaR" src="./imagenes/agregar.jpeg" alt="boton_agregar" />
        </button>
    </div>
);

const Contenido = ({ productos, productosEditandoId, onEditarProducto, onEliminarProducto, onGuardarProducto, onCancelarEdicion }) => (
    <div id="contenido" className="contenido">
        {productos.map(producto => (
            <Producto
                key={producto.id}
                {...producto}
                estaEditando={productosEditandoId.includes(producto.id)}
                onEditarProducto={() => onEditarProducto(producto.id)}
                onEliminarProducto={() => onEliminarProducto(producto.id)}
                onGuardarProducto={onGuardarProducto}
                onCancelar={onCancelarEdicion}
            />
        ))}
    </div>
);

const Producto = ({ id, ean, nombre, cantidad, estaEditando, onEditarProducto, onEliminarProducto, onGuardarProducto, onCancelar }) => (
    <div>
        {
            estaEditando ? (
                <FormularioProducto
                    id={id}
                    nombre={nombre}
                    ean={ean}
                    cantidad={cantidad}
                    onGuardarProducto={onGuardarProducto}
                    onCancelar={onCancelar}
                />
            ) : (
                <div className="producto">
                    <div className="producto-item">
                        <h2>{cantidad}</h2>
                    </div>
                    <div className="producto-item">
                        <h4>{nombre}</h4>
                        <p>{ean}</p>
                    </div>
                    <div className="botones">
                        <button className="boton" onClick={onEditarProducto}>
                            <img src="./imagenes/editar.jpeg" alt="boton_editar" />
                        </button>
                        <button className="boton" onClick={onEliminarProducto}>
                            <img src="./imagenes/eliminar.jpeg" alt="boton_eliminar" />
                        </button>
                    </div>
                </div>
            )
        }
    </div>
);

const App = () => {
    const [productos, setProductos] = useState(() => {
        const productosGuardados = localStorage.getItem('productos');
        return productosGuardados ? JSON.parse(productosGuardados).sort((a, b) => a.nombre.localeCompare(b.nombre, undefined, { sensitivity: 'base' })) : productosIniciales;
    });
    const [productosEditandoId, setProductosEditandoId] = useState([]);

    const min = 7790000000000;
    const max = 7799999999999;
    const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;

    useEffect(() => {
        localStorage.setItem('productos', JSON.stringify(productos));
    }, [productos]);

    const agregarProducto = () => {
        const nuevoProducto = { id: Date.now(), ean: randomInt, nombre: '', cantidad: null };

        setProductos([...productos, nuevoProducto]);
        setProductosEditandoId([...productosEditandoId, nuevoProducto.id]);
    };

    const editarProducto = (id) => {
        setProductosEditandoId([...productosEditandoId, id]);
    };

    const eliminarProducto = (id) => {
        setProductos(productos.filter(producto => producto.id !== id));
        if (productosEditandoId === id) {
            setProductosEditandoId(null);
        }
    };

    const guardarProducto = (productoActualizado) => {
        if (productos.length > 29) {
            alert('Excedió la cantidad de productos.');
            return;
        }

        setProductos(
            productos.map(producto => producto.id === productoActualizado.id ? productoActualizado : producto));
        setProductosEditandoId(productosEditandoId.filter(id => id !== productoActualizado.id));
    };

    const cancelarEdicion = (id) => {
        const producto = productos.find(producto => producto.id === id);
        if (!producto) {
            return;
        }

        if (!validacionProducto(producto.nombre, producto.cantidad, producto.ean)) {
            eliminarProducto(producto.id);
            return;
        }

        setProductosEditandoId(productosEditandoId.filter(editandoId => editandoId !== id));
    };

    return (
        <div className="main">
            <Titulo onAgregarProducto={agregarProducto} />
            <Contenido
                productos={productos}
                productosEditandoId={productosEditandoId}
                onEditarProducto={editarProducto}
                onEliminarProducto={eliminarProducto}
                onGuardarProducto={guardarProducto}
                onCancelarEdicion={cancelarEdicion}
            />
        </div>
    );
}

const FormularioProducto = ({ id, nombre: nombreInicial, ean: eanInicial, cantidad: cantidadInicial, onGuardarProducto, onCancelar }) => {
    const [nombre, setNombre] = useState(nombreInicial);
    const [ean, setEan] = useState(eanInicial);
    const [cantidad, setCantidad] = useState(cantidadInicial);

    const handleCantidadChange = (e) => {
        const valor = e.target.value;
        setCantidad(valor === '' ? null : Number(valor));
    };

    const handleGuardar = () => {
        if (!validacionProducto(nombre, cantidad, ean)) {
            return;
        }

        onGuardarProducto({ id, nombre, ean, cantidad });
    };

    return (
        <div className="formulario-producto">
            <div className="formulario-input">
                <div>
                    <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre" />
                </div>
                <div>
                    <input type="number" value={ean} onChange={e => setEan(e.target.value)} placeholder="EAN" />
                </div>
                <div>
                    <input type="number" value={cantidad} onChange={handleCantidadChange} placeholder="Cantidad" />
                </div>
            </div>
            <div className="botones2">
                <button className="botonForm" onClick={handleGuardar}>Aceptar</button>
                <button className="botonForm" onClick={() => onCancelar(id)}>Cancelar</button>
            </div>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));