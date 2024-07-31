function subirCondicionC5() {
    let datos = [4, 4, 2, 2, 2, 2, 4, 2, 2, 2, 4, 4, 2, 4, 2, 4, 4, 4, 2, 2, 4, 4, 4, 4, 2, 2, 4, 4, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 2, 2, 4, 2, 2, 2, 4, 2, 2, 2, 4, 2]
    let estados = document.querySelectorAll('select[name="nota"]');
    if (datos.length != estados.length) {
        alert('Error en la cantidad de alumnos >> Alumnos: ' + datos.length + 'Condiciones: ' + estados.length);
    } else {
        estados.forEach((estado, index) => estado.selectedIndex = datos[index]);
    }
}

function subirNotaC5() {
    let datos = [10, 10, 7, 7, 7, 8, 10, 8, 7, 8, 10, 10, 8, 10, 8, 10, 10, 10, 8, 8, 10, 10, 9, 10, 8, 8, 9, 10, 8, 8, 8, 8, 8, 10, 10, 10, 10, 9, 8, 8, 10, 8, 8, 8, 10, 7, 8, 8, 9, 8]
    let notas = document.querySelectorAll('input[name="nota"]');
    if (datos.length != notas.length) {
        alert('Error en la cantidad de alumnos >> Alumnos: ' + datos.length + 'Notas: ' + notas.length);
    } else {
        notas.forEach((nota, index) => nota.value = datos[index]);
    }
}