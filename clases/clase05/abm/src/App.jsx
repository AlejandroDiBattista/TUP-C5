import './App.css'
import { Contador } from './Contador'

function App() {
  function bajar() {
    console.log("1. Antes del fetch")
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => console.log("3. Al bajar el json", json))
    console.log("2. Después del fetch")
  }

  async function bajarAsincronico() {
    console.log("1. Antes del fetch (async/await)")
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    const json = await response.json()
    console.log("3. Al bajar el json", json)
  }


  return (
    <>
      <div>
        <button onClick={bajarAsincronico}>Bajar Archivo</button>
      </div>
    </>
  )
}

export default App
