const { useState, useEffect } = React;

const App = () => {
    const [items, setItems] = useState(() => {
        const savedItems = localStorage.getItem('products');
        return savedItems ? JSON.parse(savedItems) : [];
    });

    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(items));
    }, [items]);

    const [editandoItems, setEditandoItems] = useState({});
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
        setEditandoItems((prev) => ({ ...prev, [item.id]: item }));
    };

    const cerrarFormularioEdicion = (id) => {
        setEditandoItems((prev) => {
            const updated = { ...prev };
            delete updated[id];
            return updated;
        });
    };

    const modificarProducto = (id, cambios) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, ...cambios } : item
        ));
        cerrarFormularioEdicion(id);
    };

    const agregarProducto = (nuevoProducto) => {
        setItems([...items, nuevoProducto]);
        setMostrarFormulario(false);  
    };

    const handleItemClick = (id) => {
        if (!editandoItems[id]) {
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
                onCancel();  
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
            <form className="product-form" onSubmit={manejarEnvio}>
                <div className="form-inputs">
                    <input type="text" placeholder="Nombre del producto" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                    <input type="text" placeholder="Código EAN" value={ean} onChange={(e) => setEan(e.target.value)} required />
                    <input type="number" placeholder="Cantidad" value={cantidad} onChange={(e) => setCantidad(e.target.value)} required />
                    {mensajeError && <p style={{ color: 'red' }}>{mensajeError}</p>}
                </div>
                <div className="form-actions">
                    <br />
                    <button type="submit">Aceptar</button>
                    <button type="button" onClick={manejarCancelar}>Cancelar</button>
                </div>
            </form>
        );
    };

    const sortedItems = [...items].sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div className="app">
            <header>
                <h1>Control Depósito</h1>
                <button className="add-btn" onClick={() => setMostrarFormulario(!mostrarFormulario)}>
                    {mostrarFormulario ? '-' : '+'}
                </button>
            </header>
            <br /><br /><br />

            {mostrarFormulario && (
                <FormularioProducto
                    onSubmit={agregarProducto}
                    onCancel={() => setMostrarFormulario(false)}
                />
            )}

            <div className="items">
                {sortedItems.map(item => (
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
                        {editandoItems[item.id] && (
                            <FormularioProducto
                                onSubmit={modificarProducto}
                                initialData={editandoItems[item.id]}
                                onCancel={() => cerrarFormularioEdicion(item.id)}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
