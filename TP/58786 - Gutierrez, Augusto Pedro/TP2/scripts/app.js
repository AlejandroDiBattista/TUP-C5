const { createRoot } = ReactDOM
const { useState } = React

const ContactaDiaryComponent = ({id, nombre, apellido, telefono, addFavorite , addRecycle}) => {

    const style ={
        width: "16rem",
    }

    return(
        <div className="card" style={style}>
            <div className="card-body">
                <h5 className="card-title">{nombre} {apellido}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">{telefono}</h6>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>

                <div className="container-button-action">

                    <button type="button" className="btn-remove" onClick={ () => addRecycle(id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
                            <path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/>
                        </svg>
                    </button>

                    <button type="button" className="btn-favorite" onClick={ () => addFavorite(id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                            <path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z"/>
                        </svg>
                    </button>

                    <a href={`https://wa.me/${telefono}`} className="btn-contact">
                        Contactar
                    </a>
                </div>   
            </div>
        </div>
    )
    
}

const ContactFavoriteComponent = ({id, nombre, apellido, telefono, removeFavorite }) => {

    const style ={
        width: "16rem",
    }

    return(
        <div className="card" style={style}>
            <div className="card-body">
                <h5 className="card-title">{nombre} {apellido}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">{telefono}</h6>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>

                <div className="container-button-action">

                    <button type="button" className="btn-remove-favorite" onClick={() => {removeFavorite(id)}}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                            <path d="m606-286-33-144 111-96-146-13-58-136v312l126 77ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"/>
                        </svg>
                    </button>

                    <button type="button" className="btn-contact">
                        Contactar
                    </button>
                </div>   
            </div>
        </div>
    )
    
}

const ContactRecycleComponent = ({id, nombre, apellido, telefono, restoreContact, permanentlyDelete}) => {

    const style ={
        width: "20rem",
    }

    return(
        <div className="card" style={style}>
            <div className="card-body">
                <h5 className="card-title">{nombre} {apellido}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">{telefono}</h6>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>

                <div className="container-button-action">

                    <button type="button" className="btn-restore" onClick={ () => restoreContact(id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                            <path d="M440-122q-121-15-200.5-105.5T160-440q0-66 26-126.5T260-672l57 57q-38 34-57.5 79T240-440q0 88 56 155.5T440-202v80Zm80 0v-80q87-16 143.5-83T720-440q0-100-70-170t-170-70h-3l44 44-56 56-140-140 140-140 56 56-44 44h3q134 0 227 93t93 227q0 121-79.5 211.5T520-122Z"/>
                        </svg>
                    </button>

                    <button type="button" className="btn-delete-contact" onClick={ () => permanentlyDelete(id)}>
                        Eliminar Definitivamente
                    </button>
                </div>   
            </div>
        </div>
    )
    
}

const DiaryComponent = ({ data, arrayFavorite, arrayRecycle, setArrayContact, setArrayFavorite, setArrayRecycle, removeContact }) =>{

    const addFavorite = (id) => {
        const contactFind = data.find((contact) => id === contact.id); 
      
        if (contactFind) {
          setArrayFavorite([...arrayFavorite, contactFind]);
          removeContact(data, setArrayContact, contactFind.id)
        } else {
          console.warn("Contact not found with ID:", id);
        }
    };
      
    const addRecycle = (id) => {
        const contactFind = data.find((contact) => id === contact.id); 
      
        if (contactFind) {
          setArrayRecycle([...arrayRecycle, contactFind]);
          removeContact(data, setArrayContact, contactFind.id)
        } else {
          console.warn("Contact not found with ID:", id);
        }
    };

    return(
        <div className="w-100 d-flex flex-row flex-wrap justify-content-start align-items-center gap-5">
            {data.map(contact => <ContactaDiaryComponent key={contact.id} {...contact} addFavorite={addFavorite} addRecycle={addRecycle}/>)}
        </div>
    )        
}

const FavoriteComponent = ({arrayFavorite, removeContact, setArrayContact, setArrayFavorite, arrayContact}) =>{


    const removeFavorite = (id) => {
        const contactFind = data.find((contact) => id === contact.id); 
      
        if (contactFind) {
          setArrayContact([...arrayContact, contactFind]);
          removeContact(arrayFavorite, setArrayFavorite, contactFind.id)
        } else {
          console.warn("Contact not found with ID:", id);
        }
    };

    return(
        <div className="w-100 d-flex flex-row flex-wrap justify-content-start align-items-center gap-5">
            { 
                arrayFavorite.length > 0  
                ?
                arrayFavorite.map(contact => <ContactFavoriteComponent key={contact.id} {...contact} removeFavorite={removeFavorite}/>) 
                :
                null
            }
        </div>
    )
}

const RecycleComponent = ( {arrayContact, arrayRecycle, setArrayContact, setArrayRecycle, removeContact} ) =>{


    const restoreContact = (id) => {
        const contactFind = arrayRecycle.find((contact) => id === contact.id); 
      
        if (contactFind) {
          setArrayContact([...arrayContact, contactFind]);
          removeContact(arrayRecycle, setArrayRecycle, contactFind.id)
        } else {
          console.warn("Contact not found with ID:", id);
        }
    };

    const permanentlyDelete = (id) => {
        const contactFind = arrayRecycle.find((contact) => id === contact.id); 
      
        if (contactFind) {
          removeContact(arrayRecycle, setArrayRecycle, contactFind.id)
          removeContact(arrayContact, setArrayContact, contactFind.id)
        } else {
          console.warn("Contact not found with ID:", id);
        }
    };

    return(
        <div className="w-100 d-flex flex-row flex-wrap justify-content-start align-items-center gap-5">
            { 
                arrayRecycle.length > 0  
                ?
                arrayRecycle.map(contact => <ContactRecycleComponent key={contact.id} {...contact} restoreContact={restoreContact} permanentlyDelete={permanentlyDelete}/>) 
                :
                null
            }
        </div>
    )
}

const App = () =>{

    const [arrayContact, setArrayContact] = useState([...data]);
    const [arrayFavorite, setArrayFavorite] = useState([]);
    const [arrayRecycle, setArrayRecycle] = useState([]);

    const removeContact = (array, setArray, id) => {
        const filteredArray = array.filter((item) => item.id !== id);
        setArray([...filteredArray])  
    };
      
    return(
        <div className="row">

            <div className="col-12 ps-5">
                <h2 className="title-diary">Contactos Favoritos</h2>
                <div className="line"></div>

                <FavoriteComponent 
                    arrayContact={arrayContact} 
                    arrayFavorite={arrayFavorite} 
                    setArrayContact={setArrayContact} 
                    setArrayFavorite={setArrayFavorite} 
                    removeContact={removeContact} 
                />
            </div>

            <div className="col-12 ps-5">
                <h2 className="title-diary">Agenda</h2>
                <div className="line"></div>

                <DiaryComponent 
                    data={arrayContact} 
                    arrayFavorite={arrayFavorite}
                    arrayRecycle={arrayRecycle}
                    setArrayContact={setArrayContact}  
                    setArrayFavorite={setArrayFavorite} 
                    setArrayRecycle={setArrayRecycle}
                    removeContact={removeContact} 
                />

            </div>

            <div className="col-12 ps-5">
                <h2 className="title-diary">Reciclaje</h2>
                <div className="line"></div>

                <RecycleComponent
                    arrayContact={arrayContact}
                    arrayRecycle={arrayRecycle}
                    setArrayContact={setArrayContact}
                    setArrayRecycle={setArrayRecycle}
                    removeContact={removeContact}
                />
            </div>

        </div>
    )
}


const root = createRoot(document.getElementById('root'))
root.render(<App />);