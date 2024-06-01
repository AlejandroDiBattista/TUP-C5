class Agenda {
  constructor() {
    this.contactos = [];
  }

  agregar(contacto) {
    this.contactos.push(contacto);
  }

  buscar(nombre) {
    return this.contactos.find(
        contacto => contacto
            .nombreCompleto
            .include(nombre)
  }
}

class Contacto {
    constructor(nombre, apellido, edad){
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.telefonos = [];
        this.domicilios = [];
    }

    get nombreCompleto(){
        return `${this.nombre} ${this.apellido}`;
    }
    
    agregarTelefono(telefono){
        this.telefonos.push(telefono);
    }

    agregarDomicilio(domicilio){
        this.domicilios.push(domicilio);
    }
}

class Telefono {
    constructor(numero, tipo){
        this.numero = numero;
        this.tipo = tipo;
    }
}

class Domicilio {
    constructor(calle, altura, localidad){
        this.calle = calle;
        this.altura = altura;
        this.localidad = localidad;
    }
}

const agenda = new Agenda();
const juan = new Contacto('Juan', 'Perez', 25);
juan.agregarTelefono(new Telefono('123456', 'celular'));
juan.agregarTelefono(new Telefono('456789', 'fijo'));
juan.agregarDomicilio(new Domicilio('Calle 123', 123, 'CABA'));
agenda.agregar(juan);

agenda.contactos.length
agenda.contactos[0].telefonos.length
agenda.contactos[0].telefonos[0].numero 

console.log(agenda)
console.log(agenda.contactos[0])