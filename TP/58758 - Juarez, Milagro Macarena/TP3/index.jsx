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
  const [cantidad, setCantidad] = useState('');

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (nombre && ean && cantidad) {
      onSubmit({ id: uuidv4(), nombre, ean, cantidad: Number(cantidad) });
      limpiarCampos();
    }
    else {
      setMensajeError('Todos los campos deben estar completos');
    }
    
  };

  const manejarCancelar = (e) => {
    e.preventDefault();
    limpiarCampos();
  };

  const limpiarCampos = () => {
    setNombre('');
    setEan('');
    setCantidad('');
  };

  return (
    <form className="product-form">
      <div className="form-inputs">
        <input type="text" placeholder="Nombre del producto" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        <input type="text" placeholder="Código EAN" value={ean} onChange={(e) => setEan(e.target.value)} required />
        <input type="number" placeholder="Cantidad" value={cantidad} onChange={(e) => setCantidad(e.target.value)} required />
      </div>
      <div className="form-actions">
        <br></br>
        <button type="submit" onClick={manejarEnvio}>Aceptar</button>
        <button type="button" onClick={manejarCancelar}>Cancelar</button>
      </div>
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
  const [mensajeError, setMensajeError] = useState('');

  const manejarGuardar = (e) => {
    e.stopPropagation();
    if (!detalles.nombre || !detalles.ean || !detalles.cantidad) {
      setMensajeError('Todos los campos deben estar completos');
    } else {
      modificarProducto(producto.id, detalles);
      setEstaEditando(false);
      setMensajeError('');
    }
  };

  const manejarCancelar = (e) => {
    e.stopPropagation();
    setEstaEditando(false);
    setMensajeError('');
  };

  const manejarClick = () => {
    modificarProducto(producto.id, { cantidad: producto.cantidad + 1 });
  };

  useEffect(() => {
    if (estaEditando) {
      setDetalles({ nombre: producto.nombre, ean: producto.ean, cantidad: producto.cantidad });
    }
  }, [estaEditando, producto]);

  return (
    <div className="product-item" onClick={manejarClick}>
      {estaEditando ? (
        <div className="editing">
          <div className="edit-inputs">
            <div className="input-wrapper">
              <input type="text" value={detalles.nombre} onChange={(e) => setDetalles({ ...detalles, nombre: e.target.value })} placeholder="Nombre del producto" />
              <button onClick={manejarGuardar}>Aceptar</button>
            </div>
            <div className="input-wrapper">
              <input type="text" value={detalles.ean} onChange={(e) => setDetalles({ ...detalles, ean: e.target.value })} placeholder="Código EAN" />
              <button onClick={manejarCancelar}>Cancelar</button>
            </div>
            <div className="input-wrapper">
              <input type="number" value={detalles.cantidad} onChange={(e) => setDetalles({ ...detalles, cantidad: Number(e.target.value) })} placeholder="Cantidad" />
            </div>
          </div>
          {mensajeError && <div className="error-message">{mensajeError}</div>}
        </div>
      ) : (
        <div className="viewing">
          <div className="quantity">{producto.cantidad}</div>
          <div className="details">
            <div className="name">{producto.nombre}</div>
            <br />
            <div className="ean">{producto.ean}</div>
          </div>
          <div className="actions">
            <button className="edit-button" onClick={(e) => {
              e.stopPropagation();
              setEstaEditando(true);
            }}>
              <img src="editar.png" alt="Editar" />
            </button>
            <br />
            <button className="delete-button" onClick={(e) => {
              e.stopPropagation();
              eliminarProducto(producto.id);
            }}>
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
