const { useState, useEffect } = React;

const InitialProducts = [
    { id: 1, name: 'Gomitas', EAN: '7799876543210', quantity: '1' },
    { id: 2, name: 'Coca Cola', EAN: '7798765432109', quantity: '50' },
    { id: 3, name: 'Pepsi', EAN: '7797654321098', quantity: '30' },
    { id: 4, name: 'Fanta', EAN: '7796543210987', quantity: '40' },
    { id: 5, name: 'Sprite', EAN: '7795432109876', quantity: '80' }
];

function UpdateCardComponent({ product, products, onSaveProduct, onCancel }) {

    const [name, setName] = useState(product.name);
    const [EAN, setEAN] = useState(product.EAN);
    const [quantity, setQuantity] = useState(product.quantity);

    const updateName = (e) => {
        setName(e.target.value);
    };
    const updateEAN = (e) => {
        setEAN(e.target.value);
    };
    const updateQuantity = (e) => {
        setQuantity(e.target.value);
    };

    const saveChanges = (e)=> {
        e.preventDefault();
        
        if (name === '' || EAN === '' || quantity === '') {
            alert("No puedes dejar campos vacios")
            return;
        }
        const similEAN = products.find(product => product.EAN === EAN);
        if (similEAN) {
            alert("Ya existe un producto con el mismo EAN");
            return;
        }
        
        if (Number(quantity) < 0) {
            alert("La cantidad no puede ser negativa");
            return;
        }

        onSaveProduct({ id:product.id, name, EAN, quantity });
    };
    const cancel = e => {
        e.preventDefault();
        onCancel();
    };
    return (
        <form className="update-form">
            <div className="container-input">
                <input type="text" value={name} onChange={updateName} placeholder="Producto" />
                <input type="text" value={EAN} onChange={updateEAN} placeholder="EAN" />
                <input type="text" value={quantity} onChange={updateQuantity} placeholder="Cantidad" />
            </div>
            <div className="container-buttons">
                <button className="general" onClick={saveChanges}>Aceptar</button>
                <button className="general" onClick={cancel}>Cancelar</button>
            </div>
        </form>
    );
}

function CreateCardComponent( { products, counter, setProducts, setCounter, setFormCreate} ){

    const [formData, setFormData] = useState( {
        id: counter,
        name: '',
        EAN: '',
        quantity:'',
        editing: ''
    })

    const handleOnChange = (evt) => {
        setFormData({
            ...formData,
            [evt.target.name]: evt.target.value
        })
    }



    const saveNewProduct = () => {
       
        if (formData.name === "" || formData.EAN === "" || formData.quantity === "") {
            alert("Debes completar todos los campos");
            return;
        }
    
        
        const similEAN = products.find(product => product.EAN === formData.EAN);
        if (similEAN) {
            alert("Ya existe un producto con el mismo EAN");
            return;
        }
        
        if (Number(formData.quantity) < 0) {
            alert("La cantidad no puede ser negativa");
            return;
        }
        
        const productExists = products.some(product => 
            product.name === formData.name &&
            product.EAN === formData.EAN &&
            product.quantity === formData.quantity
        );
        if (productExists) {
            alert("El producto ya existe en la base de datos");
            return;
        }
    
        
        setProducts([...products, formData]);
        setFormCreate(false);
        setCounter(counter + 1);
        localStorage.setItem("counter", counter + 1);
    }
    

    return (
        <form className="update-form">
            <div className="container-input">
                <input type="text" name="name" onChange={handleOnChange} value={formData.name} placeholder="Producto" />
                <input type="text" name="EAN" onChange={handleOnChange} value={formData.EAN}  placeholder="EAN" />
                <input type="text" name="quantity" onChange={handleOnChange} value={formData.quantity} placeholder="Cantidad" />
            </div>
            <div className="container-buttons">
                <button type="button" className="general" onClick={saveNewProduct}>Aceptar</button>
                <button type="button" className="general" onClick={ () => setFormCreate(false) }>Cancelar</button>
            </div>
        </form>
    );
}
function CardComponent({ product, products, onDeleteProduct, onSaveProduct, onCancel }) {

    const [editing, setEditing] = useState(product.editing);

    const handleEditing = () => setEditing(true);

    const handleSave = (updateProduct) => {

        onSaveProduct(updateProduct);
        setEditing(false);

    };

    const handleCancel = () => {
        setEditing(false);
        onDeleteProduct();
    };

    return(
        <>
            {
                editing 
                ?
                <UpdateCardComponent 
                    product={product}
                    products={products} 
                    onSaveProduct={handleSave} 
                    onCancel={handleCancel} 
                />
                :
                <div className="card-product">
                    <div className="data">
                        <p className="quantity">{product.quantity}</p>
                    </div>
                    <div className="data">
                        <h2 className="name">{product.name}</h2>
                        <p className="ean">{product.EAN}</p>
                    </div>
                    <div className="data">
                    
                        <button className="icono" onClick={handleEditing}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                            </svg>
                        </button>

                        <button className="icono" onClick={() => onDeleteProduct(product.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 16 16">
                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                            </svg>
                        </button>

                    </div>
                </div>
            }
        </>
    )
}
function ContainerCardComponent({ products, onSaveProduct, onDeleteProduct, onCancel }) {
    return (
        <>
            
            {products.length === 0 && <h2 className="subtitle">No hay productos</h2>}

            {products.map(product => (
                <CardComponent
                    key={product.id}
                    product={product}
                    products={products}
                    onUpdateProduct={() => onSaveProduct(product.id)}
                    onDeleteProduct={onDeleteProduct}
                    onSaveProduct={onSaveProduct}
                    onCancel={onCancel}
                />
            ))}
        </>
    );
}
function App() {

    const [products, setProducts] = useState(InitialProducts);
    const [counter, setCounter] = useState(6);
    const [formCreate, setFormCreate] = useState(false);

    useEffect(() => {
        sortProductsByName();
    }, [ products]);
    console.table(products)

    const saveProduct = (updatedProduct) => {
        setProducts(products.map(product => 
            product.id === updatedProduct.id ? updatedProduct : product
        ));
    };
    

    const createProduct = () => {
        formCreate ? setFormCreate(false) : setFormCreate(true)
    };

    const deleteProduct = (id) => {
        setProducts(products.filter(product => product.id !== id));
    };

    const sortProductsByName = () => {
        const sortedProducts = [...products].sort((a, b) => a.name.localeCompare(b.name));
        setProducts(sortedProducts);
    };
    
    
    return (
        <div className="row">
            <div className="col-12 container-title">
                <h1 className="title">Control Deposito</h1>
                <div type="button" className="add-product" onClick={createProduct}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                    </svg>
                </div>
            </div>
            <div className="col-12 container-card">
                {
                    formCreate && <CreateCardComponent products={products} counter={counter} setCounter={setCounter} setProducts={setProducts} setFormCreate={setFormCreate}/>
                }
                <ContainerCardComponent
                    products={products}
                    onSaveProduct={saveProduct}
                    onDeleteProduct={deleteProduct}
                    onCancel={ () => {} }
                />
            </div>
            
        </div>
        
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);