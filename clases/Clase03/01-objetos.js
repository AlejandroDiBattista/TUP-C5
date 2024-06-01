const nombreCompleto = function (persona) {
  return `${persona.nombre} ${persona.apellido}`;
}

const persona = {
    nombre: 'Juan',
    apellido: 'Perez',
    edad: 25,

    nombreCompleto: function () {
        return `${this.nombre} ${this.apellido}`;
      },
      cumplir: function () {
        return this.edad += 1;
      }

}

// console.log(nombreCompleto(persona)); // Juan Perez
console.log(persona.nombreCompleto()); // Juan Perez

persona.cumplir();
persona.nombre = "Pedro";
persona.cumplir()

function Persona(nombre, apellido, edad){
    return {
        nombre: nombre,
        apellido: apellido,
        edad: edad,
        nombreCompleto: function () {
            return `${this.nombre} ${this.apellido}`;
        },
        cumplir: function () {
            return this.edad += 1;
        }
    }
}

let juan = Persona('Juan', 'Perez', 25);
console.log(juan.nombreCompleto());

let maria = Persona('Maria', 'Gomez', 30);

class Contacto {
    constructor(nombre, apellido, edad){
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
    }

    nombreCompleto(){
        return `${this.nombre} ${this.apellido}`;
    }

    cumplir(){
        return this.edad += 1;
    }
}

let pedro = new Contacto('Pedro', 'Gomez', 30);
console.log(pedro.nombreCompleto());
pedro.cumplir();


let hoy = new Date();
let ayer = new Date(2024, 4, 29)

ayer.getDay
ayer.getMilliseconds


let a = "hola";
let b = new String("Hola")
a.includes("o")
b.includes("o")
