const { useState, useEffect } = React;

const productosIniciales = [];

const validacionProducto = (nombre, cantidad, ean) => {
    if (nombre === '' || nombre === null || cantidad === null || cantidad === '') {
        return false;
    }

    if (cantidad < 0) {
        return false;
    }

    if (cantidad > 100) {
        return false;
    }

    if (cantidad === 0) {
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
            <img className="iconoAgregaR" src="./img/iconoagregar.jpeg" alt="boton_agregar" />
        </button>
    </div>
);

const Contenido = ({ productos, productosEditandoId, onEditarProducto, onEliminarProducto, onGuardarProducto, onCancelarEdicion, onIncrementarCantidad }) => (
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
                onIncrementarCantidad={() => onIncrementarCantidad(producto.id)}
            />
        ))}
    </div>
);

const Producto = ({ id, ean, nombre, cantidad, estaEditando, onEditarProducto, onEliminarProducto, onGuardarProducto, onCancelar, onIncrementarCantidad }) => (
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
                <div className="producto" onClick={onIncrementarCantidad}>
                    <div className="producto-item">
                        <h2>{cantidad}</h2>
                    </div>
                    <div className="producto-item">
                        <h4>{nombre}</h4>
                        <p>{ean}</p>
                    </div>
                    <div className="botones">
                        <button className="boton" onClick={(e) => {e.stopPropagation(); onEditarProducto();}}>
                            <img src="./img/iconoeditar.jpeg" alt="boton_editar" />
                        </button>
                        <button className="boton" onClick={(e) => {e.stopPropagation(); onEliminarProducto();}}>
                            <img src="./img/iconoeliminar.jpeg" alt="boton_borrar" />
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

    useEffect(() => {
        localStorage.setItem('productos', JSON.stringify(productos));
    }, [productos]);

    const agregarProducto = () => {
        if(productosEditandoId.length > 0){
            return;
        }
        const nuevoProducto = { id: Date.now(), ean: null, nombre: '', cantidad: null };

        setProductos([...productos, nuevoProducto]);
        setProductosEditandoId([...productosEditandoId, nuevoProducto.id]);
    };

    const editarProducto = (id) => {
        setProductosEditandoId([...productosEditandoId, id]);
    };

    const eliminarProducto = (id) => {
        setProductos(productos.filter(producto => producto.id !== id));
        setProductosEditandoId(productosEditandoId.filter(editandoId => editandoId !== id));
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

    const incrementarCantidad = (id) => {
        setProductos(  
            productos.map(producto =>
                producto.cantidad < 100 && 
                producto.id === id ? {...producto, cantidad:producto.cantidad + 1} : producto
            )
        )
    }

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
                onIncrementarCantidad={incrementarCantidad}
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