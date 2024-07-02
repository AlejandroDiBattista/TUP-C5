let currentEditItemId = null;

<<<<<<< Updated upstream
function incrementNumber(itemId) {
    const item = document.getElementById(itemId);
    const numberElement = item.querySelector('.number');
    numberElement.textContent = parseInt(numberElement.textContent) + 1;
}
=======
const App = () => {
    const [items, setItems] = useState(() => {
        const savedItems = localStorage.getItem('products');
        return savedItems ? JSON.parse(savedItems) : [];
    });
>>>>>>> Stashed changes

function deleteItem(itemId) {
    const item = document.getElementById(itemId);
    item.remove();
}

<<<<<<< Updated upstream
function openEditForm(itemId) {
    currentEditItemId = itemId;
    const item = document.getElementById(itemId);
    const name = item.querySelector('.details h2').textContent;
    const code = item.querySelector('.details p').textContent;
    const number = item.querySelector('.number').textContent;
=======
    const [editandoItem, setEditandoItem] = useState(null);
    const [mostrarFormularioAgregar, setMostrarFormularioAgregar] = useState(false);
>>>>>>> Stashed changes

    document.getElementById('editName').value = name;
    document.getElementById('editCode').value = code;
    document.getElementById('editNumber').value = number;
    document.getElementById('editForm').style.display = 'block';
}

function closeEditForm() {
    document.getElementById('editForm').style.display = 'none';
    currentEditItemId = null;
}

function saveEdit() {
    if (currentEditItemId) {
        const item = document.getElementById(currentEditItemId);
        const newName = document.getElementById('editName').value;
        const newCode = document.getElementById('editCode').value;
        const newNumber = document.getElementById('editNumber').value;

<<<<<<< Updated upstream
        item.querySelector('.details h2').textContent = newName;
        item.querySelector('.details p').textContent = newCode;
        item.querySelector('.number').textContent = newNumber;
=======
    const cerrarFormularioEdicion = () => {
        setEditandoItem(null);
    };
>>>>>>> Stashed changes

        closeEditForm();
    }
}

<<<<<<< Updated upstream
function addItem() {
    const container = document.querySelector('.container');
    const newItemId = 'item-' + (document.querySelectorAll('.item').length + 1);
    const name = prompt("Nombre del producto:");
    const code = prompt("Código del producto:");
    const number = prompt("cantidad:");

    if (name !== null && code !== null && number !== null) {
        const newItem = document.createElement('div');
        newItem.className = 'item';
        newItem.id = newItemId;
        newItem.innerHTML = `
            <div class="number" onclick="incrementNumber('${newItemId}')">${number}</div>
            <div class="details">
                <h2>${name}</h2>
                <p>${code}</p>
=======
    const agregarProducto = (nuevoProducto) => {
        setItems([...items, nuevoProducto]);
        setMostrarFormularioAgregar(false);  // Cierra el formulario después de agregar el producto
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
                <button className="add-btn" onClick={() => setMostrarFormularioAgregar(!mostrarFormularioAgregar)}>
                    {mostrarFormularioAgregar ? '-' : '+'}
                </button>
            </header>

            {mostrarFormularioAgregar && (
                <FormularioProducto
                    onSubmit={agregarProducto}
                    onCancel={() => setMostrarFormularioAgregar(false)}
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
>>>>>>> Stashed changes
            </div>
            <div class="actions">
                <button class="edit-btn" onclick="openEditForm('${newItemId}')"><img src="imgedit.png" alt="editar"></button>
                <button class="delete-btn" onclick="deleteItem('${newItemId}')"><img src="imgeliminar.png" alt="eliminar"></button>
            </div>
        `;
        container.appendChild(newItem);
    }
}
