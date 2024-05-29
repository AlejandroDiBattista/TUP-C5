const { useState, useEffect } = React;

const App = () => {
  const [productos, setProductos] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    const productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];
    setProductos(productosGuardados);
  }, []);

  useEffect(() => {
    localStorage.setItem('productos', JSON.stringify(productos));
  }, [productos]);

  const modificarProducto = (id, cambios) => {
    setProductos(productos.map(p => p.id === id ? { ...p, ...cambios } : p));
  };

  return (
    <div className="app">
      <div className="header">
        <h1>Control Depósito</h1>
        <button className="toggle-form-button" onClick={() => setMostrarFormulario(!mostrarFormulario)}>
          {mostrarFormulario ? '-' : '+'}
        </button>
      </div>
      {mostrarFormulario && <FormularioProducto onSubmit={nuevoProducto => setProductos([...productos, nuevoProducto])} />}
      <ListaProductos 
        productos={productos} 
        modificarProducto={modificarProducto} 
        eliminarProducto={id => setProductos(productos.filter(p => p.id !== id))} 
      />
    </div>
  );
};

const FormularioProducto = ({ onSubmit }) => {
  const [nombre, setNombre] = useState('');
  const [ean, setEan] = useState('');

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (nombre && ean) {
      onSubmit({ id: uuidv4(), nombre, ean, cantidad: 1 });
      setNombre('');
      setEan('');
    }
  };

  return (
    <form onSubmit={manejarEnvio} className="product-form">
      <input type="text" placeholder="Nombre del producto" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
      <input type="text" placeholder="Código EAN" value={ean} onChange={(e) => setEan(e.target.value)} required />
      <button type="submit">Agregar</button>
    </form>
  );
};
const ListaProductos = ({ productos, modificarProducto, eliminarProducto }) => (
  <div className="product-list">
    {productos.sort((a, b) => a.nombre.localeCompare(b.nombre)).map(producto => (
      <ItemProducto 
        key={producto.id} 
        producto={producto} 
        modificarProducto={modificarProducto} 
        eliminarProducto={eliminarProducto} 
      />
    ))}
  </div>
);

const ItemProducto = ({ producto, modificarProducto, eliminarProducto }) => {
  const [estaEditando, setEstaEditando] = useState(false);
  const [detalles, setDetalles] = useState({ nombre: producto.nombre, ean: producto.ean, cantidad: producto.cantidad });

  const manejarGuardar = () => {
    modificarProducto(producto.id, detalles);
    setEstaEditando(false);
  };

  return (
    <div className="product-item">
      {estaEditando ? (
        <div className="editing">
          <input type="text" value={detalles.nombre} onChange={(e) => setDetalles({ ...detalles, nombre: e.target.value })} />
          <input type="text" value={detalles.ean} onChange={(e) => setDetalles({ ...detalles, ean: e.target.value })} />
          <input type="number" value={detalles.cantidad} onChange={(e) => setDetalles({ ...detalles, cantidad: Number(e.target.value) })} />
          <div className="edit-actions">
            <button onClick={manejarGuardar}>Aceptar</button>
            <button onClick={() => setEstaEditando(false)}>Cancelar</button>
          </div>
        </div>
      ) : (
        <div className="viewing">
          <div className="quantity" onClick={() => modificarProducto(producto.id, { cantidad: producto.cantidad + 1 })}>{producto.cantidad}</div>
          <div className="details">
            <div className="name">{producto.nombre}</div>
            <br></br>
            <div className="ean">{producto.ean}</div>
          </div>
          <div className="actions">
            <button className="edit-button" onClick={() => setEstaEditando(true)}>
              <img src="editar.png" alt="Editar" />
            </button>
            <br></br>
            <button className="delete-button" onClick={() => eliminarProducto(producto.id)}>
              <img src="borrar.png" alt="Eliminar" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const uuidv4 = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => 
  (c === 'x' ? Math.random() * 16 : (Math.random() * 16 & 0x3 | 0x8)).toString(16)
);
ReactDOM.render(<App />, document.getElementById('root'));
