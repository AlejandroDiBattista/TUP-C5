const { useState, useEffect } = React;

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
  const [mayora13, setMayora13] = useState(false);
  const [menor, setMenor] = useState(false);

  const cambiarNombre = (e) => setNombrep(e.target.value);

  const cambiarCodigo = (e) => setCodigoEAN(e.target.value);

  const cambiarCantidad = (e) => setCantidad(e.target.value);

  const guardar = (e) => {
    e.preventDefault();
    setError(false);
    setMayora100(false);
    setMayora13(false);
    setMenor(false);

    if (nombrep.trim() === "" || codigoEAN.trim() === "" || cantidad === "") {
      setError(true);
      return;
    }
    if (parseInt(cantidad) > 100) {
      setMayora100(true);
      return;
    } else if (parseInt(cantidad) < 1) {
      setMenor(true);
      return;
    }
    if (codigoEAN.length !== 13) {
      setMayora13(true);
      return;
    }
    alGuardar({
      ...producto,
      nombrep,
      codigoEAN,
      cantidad: parseInt(cantidad),
    });
  };

  const cancelar = (e) => {
    e.preventDefault();
    alCancelar();
  };

  return (
    <form className="paneldeedicion" onSubmit={guardar}>
      <div>
        <input
          type="text"
          value={nombrep}
          onChange={cambiarNombre}
          placeholder="Nombre del producto"
        />

        <input
          type="number"
          value={codigoEAN}
          onChange={cambiarCodigo}
          placeholder="Código EAN"
        />

        <input
          type="number"
          value={cantidad}
          onChange={cambiarCantidad}
          placeholder="Cantidad"
        />

        {error && (
          <p className="error">Todos los campos deben ser completados</p>
        )}
        {menor && <p className="error">ingrese una cantidad valida</p>}
        {mayora100 && (
          <p className="error">No puede ingresar más de 100 productos</p>
        )}
        {mayora13 && <p className="error">Ingrese un código EAN válido.</p>}
      </div>

      <div className="accioneseditar">
        <button type="submit">Guardar</button>
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
  const [mostrandoFormulario, setMostrandoFormulario] = useState(false);
  const [mayora100, setMayora100] = useState(false);

  const agregarProducto = () => {
    setMostrandoFormulario(true);
    setEditando(true);
  };

  const guardarNuevoProducto = (producto) => {
    if (parseInt(producto.cantidad) > 100) {
      setMayora100(true);
      alert("No puede ingresar más de 100 productos");
      return;
    }
    alAgregar(producto);
    setMostrandoFormulario(false);
    setEditando(false);
    setMayora100(false);
  };

  const cancelarNuevoProducto = () => {
    setMostrandoFormulario(false);
    setEditando(false);
    setMayora100(false);
  };

  const productosOrdenados = [...productos].sort((a, b) =>
    a.nombrep.localeCompare(b.nombrep)
  );

  return (
    <>
      <div className="encabezado">
        <h1>Productos</h1>
        <img
          className="agregar"
          src="./iconos/iconoagregar.jpeg"
          alt=""
          onClick={agregarProducto}
          style={{ cursor: editando ? "not-allowed" : "pointer" }}
        />
      </div>
      {mostrandoFormulario && (
        <div className="panelagregar">
          <Editar
            producto={{ id: null, nombrep: "", codigoEAN: "", cantidad: "" }}
            alGuardar={guardarNuevoProducto}
            alCancelar={cancelarNuevoProducto}
          />
          {mayora100 && (
            <p className="error">No puede ingresar más de 100 productos</p>
          )}
        </div>
      )}
      {productosOrdenados.map((producto) => (
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
  const [mayora100, setMayora100] = useState(false);

  const editar = (e) => {
    e.stopPropagation();
    setEstaEditando(true);
    setEditando(true);
  };

  const guardar = (productoActualizado) => {
    if (parseInt(productoActualizado.cantidad) > 100) {
      setMayora100(true);
      alert("No puede ingresar más de 100 productos");
      return;
    }
    alEditar(productoActualizado);
    setEstaEditando(false);
    setEditando(false);
    setMayora100(false);
  };

  const cancelar = () => {
    setEstaEditando(false);
    setEditando(false);
    setMayora100(false);
  };

  const borrar = (e) => {
    e.stopPropagation();
    alBorrar(producto.id);
  };

  const añadir = () => {
    if (!editando && !estaEditando && producto.cantidad < 100) {
      const nuevaCantidad = parseInt(producto.cantidad) + 1;
      if (nuevaCantidad > 100) {
        setMayora100(true);
        alert("No puede ingresar más de 100 productos");
        return;
      }
      alEditar({ ...producto, cantidad: nuevaCantidad });
    }
  };

  return (
    <div className={`panel ${estaEditando ? "editando" : ""}`} onClick={añadir}>
      {estaEditando ? (
        <div className="formulario-edicion">
          <Editar
            producto={producto}
            alGuardar={guardar}
            alCancelar={cancelar}
          />
          {mayora100 && (
            <p className="error">No puede ingresar más de 100 productos</p>
          )}
        </div>
      ) : (
        <div className="contenido">
          <p className="ps">{producto.nombrep}</p>
          <p className="ps">{producto.codigoEAN}</p>
          <p className="cantidadn">{producto.cantidad}</p>
          <div className="acciones">
            <img
              className="editar"
              src="./iconos/iconoeditar.jpeg"
              onClick={editar}
              style={{
                cursor: editando || estaEditando ? "not-allowed" : "pointer",
              }}
            />
            <br />
            <img
              className="borrar"
              src="./iconos/iconoeliminar.jpeg"
              onClick={borrar}
              style={{
                cursor: editando || estaEditando ? "not-allowed" : "pointer",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

let contadorID = ProductoIniciales.length;

function App() {
  const [productosx, setProductosx] = useState(() => {
    const productosGuardados = localStorage.getItem("productos");
    return productosGuardados
      ? JSON.parse(productosGuardados)
      : ProductoIniciales;
  });
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    localStorage.setItem("productos", JSON.stringify(productosx));
  }, [productosx]);

  const guardar = (productoActualizado) => {
    let nuevosProductos;
    if (productoActualizado.id === null) {
      productoActualizado.id = ++contadorID;
      nuevosProductos = [...productosx, productoActualizado];
    } else {
      nuevosProductos = productosx.map((p) =>
        p.id === productoActualizado.id ? productoActualizado : p
      );
    }
    setProductosx(nuevosProductos);
  };

  const borrar = (id) => {
    const nuevosProductos = productosx.filter((p) => p.id !== id);
    setProductosx(nuevosProductos);
  };

  const agregar = (producto) => {
    producto.id = ++contadorID;
    setProductosx([...productosx, producto]);
  };

  return (
    <div className="App">
      <Lista
        productos={productosx}
        alEditar={guardar}
        alBorrar={borrar}
        alAgregar={agregar}
        editando={editando}
        setEditando={setEditando}
      />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
