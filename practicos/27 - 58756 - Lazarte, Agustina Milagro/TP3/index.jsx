const { useState, useEffect } = React;

const App = () => {
    const [items, setItems] = useState(() => {
        const savedItems = localStorage.getItem('products');
        if (savedItems) {
            return JSON.parse(savedItems);
        } else {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(items));
    }, [items]);

    const [editandoItem, setEditandoItem] = useState(null);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const incrementarCantidad = (id) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        ));
    };

    const eliminarItem = (id) => {
        setItems(items.filter(item => item.id !== id));
    };

    const abrirFormularioEdicion = (item) => {
        setEditandoItem(item);
    };

    const cerrarFormularioEdicion = () => {
        setEditandoItem(null);
        setMostrarFormulario(false);
    };

    const modificarProducto = (id, cambios) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, ...cambios } : item
        ));
        cerrarFormularioEdicion();
    };

    const agregarProducto = (nuevoProducto) => {
        setItems([...items, nuevoProducto]);
    };

    const handleItemClick = (id) => {
        if (!editandoItem || editandoItem.id !== id) {
            incrementarCantidad(id);
        }
    };

    const FormularioProducto = ({ onSubmit, initialData, onCancel }) => {
        const [nombre, setNombre] = useState(initialData ? initialData.name : '');
        const [ean, setEan] = useState(initialData ? initialData.code : '');
        const [cantidad, setCantidad] = useState(initialData ? initialData.quantity : '');
        const [mensajeError, setMensajeError] = useState('');

        const manejarEnvio = (e) => {
            e.preventDefault();
            if (nombre && ean && cantidad) {
                if (initialData) {
                    onSubmit(initialData.id, { name: nombre, code: ean, quantity: Number(cantidad) });
                } else {
                    onSubmit({ id: items.length ? items[items.length - 1].id + 1 : 1, name: nombre, code: ean, quantity: Number(cantidad) });
                }
                limpiarCampos();
            } else {
                setMensajeError('Todos los campos deben estar completos');
            }
        };

        const manejarCancelar = (e) => {
            e.preventDefault();
            limpiarCampos();
            onCancel();
        };

        const limpiarCampos = () => {
            setNombre('');
            setEan('');
            setCantidad('');
            setMensajeError('');
        };

        return (
            <form className="product-form">
                <div className="form-inputs">
                    <input type="text" placeholder="Nombre del producto" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                    <input type="text" placeholder="Código EAN" value={ean} onChange={(e) => setEan(e.target.value)} required />
                    <input type="number" placeholder="Cantidad" value={cantidad} onChange={(e) => setCantidad(e.target.value)} required />
                    {mensajeError && <p style={{ color: 'red' }}>{mensajeError}</p>}
                </div>
                <div className="form-actions">
                    <br />
                    <button type="submit" onClick={manejarEnvio}>Aceptar</button>
                    <button type="button" onClick={manejarCancelar}>Cancelar</button>
                </div>
            </form>
        );
    };

    return (
        <div className="app">
            <header>
                <h1>Control Depósito</h1>
                <button className="add-btn" onClick={() => setMostrarFormulario(!mostrarFormulario)}>
                    {mostrarFormulario ? '-' : '+'}
                </button>
            </header>

            {mostrarFormulario && !editandoItem && (
                <FormularioProducto
                    onSubmit={agregarProducto}
                    onCancel={() => setMostrarFormulario(false)}
                />
            )}

            <div className="items">
                {items.map(item => (
                    <div key={item.id} style={{ position: 'relative' }}>
                        <div className="item" id={`item-${item.id}`} onClick={() => handleItemClick(item.id)}>
                            <div className="number">{item.quantity}</div>
                            <div className="details">
                                <h2>{item.name}</h2>
                                <p>{item.code}</p>
                            </div>
                            <div className="actions">
                                <button className="edit-btn" onClick={(e) => { e.stopPropagation(); abrirFormularioEdicion(item); }}>
                                    <img src="editar.png" alt="editar" className="icon-edit" />
                                </button>
                                <button className="delete-btn" onClick={(e) => { e.stopPropagation(); eliminarItem(item.id); }}>
                                    <img src="eliminar.png" alt="eliminar" className="icon-delete" />
                                </button>
                            </div>
                        </div>
                        {editandoItem && editandoItem.id === item.id && (
                            <FormularioProducto
                                onSubmit={modificarProducto}
                                initialData={editandoItem}
                                onCancel={cerrarFormularioEdicion}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
