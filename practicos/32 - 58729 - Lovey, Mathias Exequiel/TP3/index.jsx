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
                setCantidad(Math.min(Math.max(0, e.target.value), 100)); // Limitar la cantidad a un máximo de 100 unidades
                setError(false);
            };

            const guardar = e => {
                e.preventDefault();
                if (nombre.trim() === '' || EAN.trim() === '' || cantidad === '') {
                    alert('Todos los campos son necesarios');
                    return;
                }
                alGuardar({ ...producto, producto: nombre, EAN, cantidad });
            };

            const cancelar = e => {
                e.preventDefault();
                alCancelar();
            };

            return (
                <form className="panel formulario-edicion">
                    <div>
                        <input type="text" value={nombre} onChange={cambiarNombre} placeholder="Producto" />
                        <input type="text" value={EAN} onChange={cambiarEAN} placeholder="EAN" />
                        <input type="number" value={cantidad} onChange={cambiarCantidad} placeholder="Cantidad" />
                    </div>
                    <div className="acciones">
                        <button className="general" onClick={guardar}>Aceptar</button>
                        <button className="general" onClick={cancelar}>Cancelar</button>
                    </div>
                </form>
            );
        }

        function Producto({ producto, alEditar, alBorrar, alGuardar, alCancelar, alIncrementar }) {
            const [editando, setEditando] = useState(producto.editando);

            const handleEditar = (e) => {
                e.stopPropagation();
                setEditando(true);
            };

            const handleGuardar = (productoActualizado) => {
                alGuardar(productoActualizado);
                setEditando(false);
            };

            const handleCancelar = () => {
                setEditando(false);
                alCancelar();
            };

            return editando ? (
                <Editar producto={producto} alGuardar={handleGuardar} alCancelar={handleCancelar} />
            ) : (
                <div className="panel" onClick={() => alIncrementar(producto.id)}>
                    <div className="cantidad">{producto.cantidad}</div>
                    <div className="info">
                        <p><strong>{producto.producto}</strong></p>
                        <p>{producto.EAN}</p>
                    </div>
                    <div className="acciones">
                        <button className="icono" onClick={handleEditar}>
                            <img src="imagenes/iconoEdita.png" alt="Editar" />
                        </button>
                        <button className="icono" onClick={(e) => {
                            e.stopPropagation();
                            alBorrar(producto.id);
                        }}>
                            <img src="imagenes/iconoBorra.png" alt="Borrar" />
                        </button>
                    </div>
                </div>
            );
        }

        function Agenda({ productos, alAgregar, alGuardar, alBorrar, alCancelar, alIncrementar }) {
            return (
                <>
                    <div className="nav">
                        <h1>Control Depósito</h1>
                        {productos.length < 30 &&  <img src="imagenes/iconoAgrega.png" class="Agrega" alt="" onClick={alAgregar}/>}
                    </div>
                    {productos.length === 0 && <h2>No hay productos</h2>}
                    {productos.map(producto => (
                        <Producto
                            key={producto.id}
                            producto={producto}
                            alEditar={() => alGuardar(producto.id)}
                            alBorrar={alBorrar}
                            alGuardar={alGuardar}
                            alCancelar={alCancelar}
                            alIncrementar={alIncrementar}
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
                const productosActualizados = productos.map(p => p.id === productoActualizado.id ? productoActualizado : p);
                setProductos(productosActualizados.sort((a, b) => a.producto.localeCompare(b.producto)));
            };

            const cancelarEdicion = () => {};

            const agregarProducto = () => {
                if (productos.length < 30) {
                    const nuevoProducto = {
                        id: Date.now(),
                        producto: '',
                        EAN: '',
                        cantidad: 0,
                        editando: true
                    };
                    const productosActualizados = [...productos, nuevoProducto];
                    // Validar que no haya productos con campos vacíos antes de agregar el nuevo producto
                    if (productos.every(p => p.producto.trim() !== '' && p.EAN.trim() !== '' && p.cantidad !== '')) {
                        setProductos(productosActualizados.sort((a, b) => a.producto.localeCompare(b.producto)));
                    } else {
                        alert('Complete todos los campos antes de agregar un nuevo producto.');
                    }
                }
            };

            const borrarProducto = (id) => {
                setProductos(productos.filter(p => p.id !== id));
            };

            const incrementarCantidad = (id) => {
                const productosActualizados = productos.map(p=> {
                    if (p.id === id && p.cantidad < 100) { // Verificar si la cantidad es menor a 100
                        return { ...p, cantidad: p.cantidad + 1 };
                    }
                    return p;
                });
                setProductos(productosActualizados);
            };

            return (
                <Agenda
                    productos={productos}
                    alAgregar={agregarProducto}
                    alGuardar={guardarProducto}
                    alBorrar={borrarProducto}
                    alCancelar={cancelarEdicion}
                    alIncrementar={incrementarCantidad}
                />
            );
        }

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<App />);

