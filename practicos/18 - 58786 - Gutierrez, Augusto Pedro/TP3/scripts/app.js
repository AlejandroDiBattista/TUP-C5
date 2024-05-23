const { createRoot } = ReactDOM;
const { useState } = React;

const ProductForm = ({ onAddProduct }) => {
    const [name, setName] = useState("");
    const [ean, setEan] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && ean) {
            onAddProduct({ name, ean, quantity: 1 });
            setName("");
            setEan("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div className="mb-3">
                <label htmlFor="productName" className="form-label">Nombre del Producto</label>
                <input
                    type="text"
                    className="form-control"
                    id="productName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="productEan" className="form-label">Código EAN</label>
                <input
                    type="text"
                    className="form-control"
                    id="productEan"
                    value={ean}
                    onChange={(e) => setEan(e.target.value)}
                />
            </div>
            <button type="submit" className="btn btn-primary">Agregar Producto</button>
        </form>
    );
};

const ProductList = ({ products, onIncrement, onEdit, onDelete }) => {
    return (
        <div className="table-container">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">EAN</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="text-center"><p>Sin productos en el inventario</p></td>
                        </tr>
                    ) : (
                        products.sort((a, b) => a.name.localeCompare(b.name)).map(product => (
                            <tr key={product.ean}>
                                <td>{product.name}</td>
                                <td>{product.ean}</td>
                                <td>{product.quantity}</td>
                                <td className="container-button-action">
                                    <button className="btn btn-edit" onClick={() => onIncrement(product.ean)}>Incrementar</button>
                                    <button className="btn btn-edit" onClick={() => onEdit(product.ean)}>Editar</button>
                                    <button className="btn btn-remove" onClick={() => onDelete(product.ean)}>Eliminar</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

const App = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);

    const addProduct = (product) => {
        const existingProductIndex = products.findIndex(p => p.ean === product.ean);
        if (existingProductIndex !== -1) {
            const updatedProducts = [...products];
            updatedProducts[existingProductIndex].quantity += 1;
            setProducts(updatedProducts);
        } else {
            setProducts(prevProducts => [...prevProducts, product]);
        }
    };
    

    const incrementProduct = (ean) => {
        setProducts(products.map(p => p.ean === ean ? { ...p, quantity: p.quantity + 1 } : p));
    };

    const deleteProduct = (ean) => {
        setProducts(products.filter(p => p.ean !== ean));
    };

    const editProduct = (ean) => {
        const product = products.find(p => p.ean === ean);
        setEditingProduct(product);
    };

    const saveProduct = (updatedProduct) => {
        const updatedProducts = products.map(p =>
            p.ean === editingProduct.ean ? updatedProduct : p
        );
        setProducts(updatedProducts);
        setEditingProduct(null);
    };

    return (
        <div className="container">
            <h1 className="title">Control de Depósito</h1>
            <div className="line"></div>
            <ProductForm onAddProduct={addProduct} />
            <ProductList
                products={products}
                onIncrement={incrementProduct}
                onEdit={editProduct}
                onDelete={deleteProduct}
            />
            {editingProduct && (
                <>
                    <div className="modal-backdrop"></div>
                    <EditProductModal
                        product={editingProduct}
                        onSave={saveProduct}
                        onCancel={() => setEditingProduct(null)}
                    />
                </>
            )}
        </div>
    );
};

const EditProductModal = ({ product, onSave, onCancel }) => {
    const [name, setName] = useState(product.name);
    const [ean, setEan] = useState(product.ean);
    const [quantity, setQuantity] = useState(product.quantity);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...product, name, ean, quantity });
    };

    return (
        <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Editar Producto</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={onCancel}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="editProductName" className="form-label">Nombre del Producto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="editProductName"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="editProductEan" className="form-label">Código EAN</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="editProductEan"
                                    value={ean}
                                    onChange={(e) => setEan(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="editProductQuantity" className="form-label">Cantidad</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="editProductQuantity"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Guardar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);
