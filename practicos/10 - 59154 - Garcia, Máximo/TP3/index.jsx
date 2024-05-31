const { useState } = React;

const ProductoIniciales = [
  { id: 1, nombrep: "Manzanas", codigoEAN: "1234567890123", cantidad: 10 },
  { id: 2, nombrep: "Leche", codigoEAN: "2345678901234", cantidad: 20 },
  { id: 3, nombrep: "Pan", codigoEAN: "3456789012345", cantidad: 15 },
  { id: 4, nombrep: "Huevos", codigoEAN: "4567890123456", cantidad: 30 },
  { id: 5, nombrep: "Queso", codigoEAN: "5678901234567", cantidad: 25 },
];

function Editar({ producto, alGuardar, alCancelar }) {
  const [nombrep, setNombrep] = useState(producto.nombrep);
  const [codigoEAN, setCodigoEAN] = useState(producto.codigoEAN);
  const [cantidad, setCantidad] = useState(producto.cantidad);
  const [error, setError] = useState(false);
  const [mayora100, setMayora100] = useState(false);

  const cambiarNombre = (e) => {
    setNombrep(e.target.value);
    setError(false);
  };

  const cambiarCodigo = (e) => {
    setCodigoEAN(e.target.value);
    setError(false);
  };

  const cambiarCantidad = (e) => {
    setCantidad(e.target.value);
    setError(false);
  };

  const guardar = (e) => {
    e.preventDefault();
    if (nombrep.trim() === "" || codigoEAN.trim() === "" || cantidad === "") {
      setError(true);
      return;
    }
    if (cantidad > 100) {
      setMayora100(true);
      return;
    }
    alGuardar({ ...producto, nombrep, codigoEAN, cantidad });
  };

  const cancelar = (e) => {
    e.preventDefault();
    alCancelar();
  };

  return (
    <form className="panel" onClick={(e) => e.stopPropagation()}>
      <label>Nombre</label>
      <input type="text" value={nombrep} onChange={cambiarNombre} />

      <label>Codigo EAN</label>
      <input type="text" value={codigoEAN} onChange={cambiarCodigo} />

      <label>Cantidad</label>
      <input type="number" value={cantidad} onChange={cambiarCantidad} />
      {error && <p className="error">Todos los campos deben ser completados</p>}
      {mayora100 && (
        <p className="error">No puede ingresar más de 100 productos</p>
      )}

      <div className="acciones">
        <button onClick={guardar}>Guardar</button>
        <button onClick={cancelar}>Cancelar</button>
      </div>
    </form>
  );
}

function Lista({
  productos,
  alEditar,
  alBorrar,
  alAgregar,
  editando,
  setEditando,
}) {
  return (
    <>
      <h1>Productos</h1>
      <img
        className="agregar"
        src="./iconos/iconoagregar.jpeg"
        alt=""
        onClick={alAgregar}
        disabled={editando}
      />
      {productos.map((producto) => (
        <Mostrar
          key={producto.id}
          producto={producto}
          alEditar={alEditar}
          alBorrar={alBorrar}
          editando={editando}
          setEditando={setEditando}
        />
      ))}
    </>
  );
}

function Mostrar({ producto, alEditar, alBorrar, editando, setEditando }) {
  const [estaEditando, setEstaEditando] = useState(false);

  const editar = (e) => {
    e.stopPropagation();
    setEstaEditando(true);
    setEditando(true);
  };

  const guardar = (productoActualizado) => {
    alEditar(productoActualizado);
    setEstaEditando(false);
    setEditando(false);
  };

  const cancelar = () => {
    setEstaEditando(false);
    setEditando(false);
  };

  const borrar = (e) => {
    e.stopPropagation();
    alBorrar(producto.id);
  };

  const añadir = () => {
    if (!editando && !estaEditando) {
      const nuevaCantidad = parseInt(producto.cantidad) + 1;
      alEditar({ ...producto, cantidad: nuevaCantidad });
    }
  };

  return (
    <div className={`panel ${estaEditando ? "editando" : ""}`} onClick={añadir}>
      <p className="ps">{producto.nombrep}</p>
      <p className="ps">{producto.codigoEAN}</p>
      <p className="cantidadn">{producto.cantidad}</p>
      <div className="acciones">
        <img
          className="editar"
          src="./iconos/iconoeditar.jpeg"
          onClick={editar}
          disabled={editando || estaEditando}
        />
        <img
          className="borrar"
          src="./iconos/iconoeliminar.jpeg"
          onClick={borrar}
          disabled={editando || estaEditando}
        />
      </div>
      <div className={`formulario-edicion ${estaEditando ? "editando" : ""}`}>
        {estaEditando && (
          <Editar
            producto={producto}
            alGuardar={guardar}
            alCancelar={cancelar}
          />
        )}
      </div>
    </div>
  );
}

let contadorID = ProductoIniciales.length;

function App() {
  const [productosx, setProductosx] = useState(ProductoIniciales);
  const [editando, setEditando] = useState(false);

  const guardar = (productoActualizado) => {
    const copia = productosx.map((c) =>
      c.id === productoActualizado.id ? productoActualizado : c
    );
    setProductosx(copia);
    setEditando(false);
  };

  const borrar = (id) => {
    const copia = productosx.filter((c) => c.id !== id);
    setProductosx(copia);
  };

  const agregarProducto = () => {
    contadorID += 1;
    const nuevoProducto = {
      id: contadorID,
      nombrep: "Nuevo Producto",
      codigoEAN: "0000000000000",
      cantidad: 0,
    };
    setProductosx([nuevoProducto, ...productosx]);
  };

  const cancelarEdicion = () => {
    setEditando(false);
  };

  return (
    <Lista
      productos={productosx}
      alEditar={guardar}
      alBorrar={borrar}
      alAgregar={agregarProducto}
      editando={editando}
      setEditando={setEditando}
    />
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
