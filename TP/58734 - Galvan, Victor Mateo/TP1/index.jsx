var contactos = [
    { id: 1, nombre: "Juan", telefono: "123456789" },
    { id: 2, nombre: "María", telefono: "987654321" },
    { id: 3, nombre: "Pedro", telefono: "456789123" },
    { id: 4, nombre: "maxi", telefono: "45345667" },
    { id: 5, nombre: "agustin", telefono: "98345667" },
    { id: 6, nombre: "chipotle", telefono: "98675667" }
];

function imprimirContactos() {
    var listaContactos = document.getElementById("lista-contactos");
    listaContactos.innerHTML = "";

    contactos.forEach(function (contacto) {
        var itemLista = document.createElement("li");
        itemLista.textContent = "ID: " + contacto.id + ", Nombre: " + contacto.nombre + ", Teléfono: " + contacto.telefono;
        listaContactos.appendChild(itemLista);
    });
}

// function agregarContacto(nombre, telefono) {
//     var nuevoId = contactos.length + 1;
//     contactos.push({ id: nuevoId, nombre: nombre, telefono: telefono });
//     imprimirContactos();
// }

document.addEventListener("DOMContentLoaded", function () {
    imprimirContactos();
});


