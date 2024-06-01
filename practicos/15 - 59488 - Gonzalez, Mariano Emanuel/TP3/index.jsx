const { useState: usarEstado, useEffect: usarEfecto } = React;
const { createRoot: crearRaiz } = ReactDOM;

const productosBase = [];

const verificarProducto = (nombreProducto, cantidadProducto, codigoEAN) => {
    if (nombreProducto === '' || nombreProducto === null || cantidadProducto === null || cantidadProducto === '') {
        alert("Hay campos incompletos.");
        return false;
    }

    if (cantidadProducto < 0) {
        alert("El stock no puede ser negativo");
        return false;
    }
    return true;
}

const Encabezado = ({ onAgregarProducto }) => (
    <div className="titulo">
        <div className="titulo1">
            <h1>Control Depósito</h1>
        </div>
        <button className="boton3" onClick={onAgregarProducto}>
            <img className="iconoAgregaR" src="./iconosprof/iconoAgrega.png" alt="boton_agregar" />
        </button>
    </div>
);

const ContenidoPrincipal = ({ productos, editandoIds, onEditarProducto, onEliminarProducto, onGuardarProducto, onCancelarEdicion, onIncrementarStock }) => (
    <div id="contenido" className="contenido">
        {productos.map(item => (
            <ItemProducto
                key={item.id}
                {...item}
                estaEditando={editandoIds.includes(item.id)}
                onEditarProducto={() => onEditarProducto(item.id)}
                onEliminarProducto={() => onEliminarProducto(item.id)}
                onGuardarProducto={onGuardarProducto}
                onCancelar={onCancelarEdicion}
                onIncrementarStock={() => onIncrementarStock(item.id)}
            />
        ))}
    </div>
);

const ItemProducto = ({ id, ean, nombre, cantidad, estaEditando, onEditarProducto, onEliminarProducto, onGuardarProducto, onCancelar, onIncrementarStock }) => (
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
                <div className="producto" onClick={onIncrementarStock}>
                    <div className="producto-item">
                        <h2>{cantidad}</h2>
                    </div>
                    <div className="producto-item">
                        <h4>{nombre}</h4>
                        <p>{ean}</p>
                    </div>
                    <div className="botones">
                        <button className="boton" onClick={(e) => { e.stopPropagation(); onEditarProducto(); }}>
                            <img src="./iconosprof/iconoEdita.png" alt="boton_editar" />
                        </button>
                        <button className="boton" onClick={(e) => { e.stopPropagation(); onEliminarProducto(); }}>
                            <img src="./iconosprof/iconoBorra.png" alt="boton_borrar" />
                        </button>
                    </div>
                </div>
            )
        }
    </div>
);

const Aplicacion = () => {
    const [listaProductos, setListaProductos] = usarEstado(() => {
        const productosGuardados = localStorage.getItem('productos');
        return productosGuardados ? JSON.parse(productosGuardados).sort((a, b) => a.nombre.localeCompare(b.nombre, undefined, { sensitivity: 'base' })) : productosBase;
    });
    const [idsEditando, setIdsEditando] = usarEstado([]);

    usarEfecto(() => {
        localStorage.setItem('productos', JSON.stringify(listaProductos));
    }, [listaProductos]);

    const ordenarProductos = (productos) => {
        return productos.sort((a, b) => a.nombre.localeCompare(b.nombre, undefined, { sensitivity: 'base' }));
    };

    const agregarProducto = () => {
        const nuevoItem = { id: Date.now(), ean: '', nombre: '', cantidad: null };
        const nuevosProductos = [...listaProductos, nuevoItem];
        setListaProductos(ordenarProductos(nuevosProductos));
        setIdsEditando([...idsEditando, nuevoItem.id]);
    };

    const editarProducto = (id) => {
        setIdsEditando([...idsEditando, id]);
    };

    const eliminarProducto = (id) => {
        const nuevosProductos = listaProductos.filter(item => item.id !== id);
        setListaProductos(ordenarProductos(nuevosProductos));
        if (idsEditando.includes(id)) {
            setIdsEditando(idsEditando.filter(editId => editId !== id));
        }
    };

    const guardarProducto = (productoActualizado) => {
        if (listaProductos.length > 290000) {
            alert('Excedió la cantidad de productos.');
            return;
        }

        const nuevosProductos = listaProductos.map(item => item.id === productoActualizado.id ? productoActualizado : item);
        setListaProductos(ordenarProductos(nuevosProductos));
        setIdsEditando(idsEditando.filter(id => id !== productoActualizado.id));
    };

    const cancelarEdicion = (id) => {
        const item = listaProductos.find(item => item.id === id);
        if (!item) {
            return;
        }

        //if (!verificarProducto(item.nombre, item.cantidad, item.ean)) {
            if (item.nombre === '' || item.cantidad === null || item.ean === '') {
            eliminarProducto(item.id);
           // return;
         }

        setIdsEditando(idsEditando.filter(editId => editId !== id));
    };

    const incrementarStock = (id) => {
        const nuevosProductos = listaProductos.map(item => 
            item.id === id ? { ...item, cantidad: (item.cantidad || 0) + 1 } : item
        );
        setListaProductos(ordenarProductos(nuevosProductos));
    };

    return (
        <div className="main">
            <Encabezado onAgregarProducto={agregarProducto} />
            <ContenidoPrincipal
                productos={listaProductos}
                editandoIds={idsEditando}
                onEditarProducto={editarProducto}
                onEliminarProducto={eliminarProducto}
                onGuardarProducto={guardarProducto}
                onCancelarEdicion={cancelarEdicion}
                onIncrementarStock={incrementarStock}
            />
        </div>
    );
}

const FormularioProducto = ({ id, nombre: nombreInicial, ean: eanInicial, cantidad: cantidadInicial, onGuardarProducto, onCancelar }) => {
    const [nombre, setNombre] = usarEstado(nombreInicial);
    const [ean, setEan] = usarEstado(eanInicial);
    const [cantidad, setCantidad] = usarEstado(cantidadInicial);

    const manejarCambioCantidad = (e) => {
        const valor = e.target.value;
        setCantidad(valor === '' ? null : Number(valor));
    };

    const manejarGuardar = () => {
        if (!verificarProducto(nombre, cantidad, ean)) {
            return;
        }

        onGuardarProducto({ id, nombre, ean, cantidad });
    };
    const manejarCancelar = () => {
        onCancelar(id);
    }

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
                    <input type="number" value={cantidad} onChange={manejarCambioCantidad} placeholder="Cantidad" />
                </div>
            </div>
            <div className="botones2">
                <button className="botonForm" onClick={manejarGuardar}>Aceptar</button>
                <button className="botonForm" onClick={() => onCancelar(id)}>Cancelar</button>
            </div>
        </div>
    );
};

const contenedor = document.getElementById('root');
const raiz = crearRaiz(contenedor);
raiz.render(<Aplicacion />);
