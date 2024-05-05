function BoardComponent() {

    const arrayObjectContact = [
        { id: 1, name: "Augusto", surname: "Gutierrez", cell: 3815377029 },
        { id: 2, name: "Martin", surname: "Guzman", cell: 3815977469 },
        { id: 3, name: "Karina", surname: "Fernandez", cell: 3813377524 },
        { id: 4, name: "Mirta", surname: "Luna", cell: 3815357422 },
        { id: 5, name: "Hector", surname: "Messi", cell: 3814957066 },
        { id: 6, name: "Lucas", surname: "Pascal", cell: 3813935064 },
        { id: 7, name: "Micaela", surname: "Robles", cell: 3817975058 },
        { id: 8, name: "Matias", surname: "Martinez", cell: 3814967729 },
        { id: 9, name: "Luciana", surname: "Fernandez", cell: 3817954044 },
        { id: 10, name: "Elias", surname: "Chavez", cell: 3815475025 },
        { id: 11, name: "Nahir", surname: "Perez", cell: 3815364029 },
        { id: 12, name: "Maria Jose", surname: "Sarmiento", cell: 3815457508 },
        { id: 13, name: "Milagros", surname: "Ruiz", cell: 3815450350 },
        { id: 14, name: "Julian", surname: "Gutierrez", cell: 38178743908 },
        { id: 15, name: "Pedro", surname: "Gutierrez", cell: 3819734826 },
        { id: 16, name: "Facundo", surname: "Gomez", cell: 3812973659 },
        { id: 17, name: "Nicolas", surname: "Pereyra", cell: 3815977029 },
        { id: 18, name: "Maximo", surname: "Perez", cell: 3815977029 },
        { id: 19, name: "Gabriela", surname: "Perez", cell: 3815977029 },
    ]

    return (

        <table className="table table-dark border border-info">

            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">NOMBRE</th>
                    <th scope="col">APELLIDO</th>
                    <th scope="col">TELEFONO</th>
                </tr>
            </thead>
            <tbody>
                {
                    arrayObjectContact.map(
                        (contact) => (
                            <tr key={contact.id}>
                                <th scope="row">{contact.id}</th>
                                <td>{contact.name}</td>
                                <td>{contact.surname}</td>
                                <td>{contact.cell}</td>
                            </tr>
                        ))
                }
            </tbody>
        </table>
    )
}

function HeaderComponent() {
    return (
        <header className='container-fluid bg-dark'>
            <section className='row'>

                <section className='col-12 w-100 h-25 p-3 d-flex justify-content-center align-items-center'>
                    <h1 className='h1 text-info'>Lista de contactos</h1>
                </section>

                <section className='col-12 w-100 h-75 d-flex justify-content-center align-items-center'>
                    <BoardComponent />
                </section>
            </section>
        </header>
    )
}

function App() {
    return (
        <HeaderComponent />
    )
}

ReactDOM.render(<App />, document.getElementById('root'))