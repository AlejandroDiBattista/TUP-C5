const App = () =>  {
    let contactos = [{
        "id": 1,
        "name": "John Doe",
        "phone": "+54705388272"
    }, {
        "id": 2,
        "name": "Jane Doe",
        "phone": "+54024419291"
    }, {
        "id": 3,
        "name": "Bob Smith",
        "phone": "+54130464503"
    }, {
        "id": 4,
        "name": "Alice Smith",
        "phone": "+54764925705"
    }, {
        "id": 5,
        "name": "Charlie Brown",
        "phone": "+54244019730"
    }, {
        "id": 6,
        "name": "David Miller",
        "phone": "+54700897730"
    }, {
        "id": 7,
        "name": "Eve Green",
        "phone": "+54737573885"
    }, {
        "id": 8,
        "name": "Frank Jones",
        "phone": "+54975397820"
    }, {
        "id": 9,
        "name": "Grace White",
        "phone": "+54903020934"
    }, {
        "id": 10,
        "name": "Henry Davis",
        "phone": "+54388346849"
    }]
    return (
        <div className="app-container">
            <h1>Contactos</h1>
            <div className="contact-container">
            {
                contactos.map((contacto) => {
                    return (
                        <div className="contact" key={contacto.id}>
                            <p style={{fontWeight: 'bold', fontSize: '15px'}}>{contacto.name}</p>
                            <p>{contacto.phone}</p>
                        </div>
                    );
                })
            }
            </div>
        </div>
    );
}


ReactDOM.render(<App />, document.getElementById('root'));
