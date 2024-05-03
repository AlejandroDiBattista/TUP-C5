import BoardComponent from "../BoardComponent/BoardComponent";
import "./header-component.css";

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

export default HeaderComponent