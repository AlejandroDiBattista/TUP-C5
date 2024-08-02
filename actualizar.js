function cambiarCondicionC5() {
    let datos = [4, 4, 2, 2, 2, 2, 4, 2, 2, 2, 4, 4, 2, 4, 2, 4, 4, 4, 2, 2, 4, 4, 4, 4, 2, 2, 4, 4, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 2, 2, 4, 2, 2, 2, 4, 2, 2, 2, 4, 2]
    let estados = document.querySelectorAll('select[name="nota"]');
    estados.forEach((estado, index) => estado.selectedIndex = datos[index]);
}

function cambiarNotaC5() {
    let datos = [10, 10, 0, 0, 0, 0, 10, 0, 0, 0, 10, 10, 0, 10, 0, 10, 10, 10, 0, 0, 10, 10, 9, 10, 0, 0, 9, 10, 0, 0, 0, 0, 0, 10, 10, 10, 10, 9, 0, 0, 10, 0, 0, 0, 10, 0, 0, 0, 9, 0]
    let notas = document.querySelectorAll('input[name="nota"]');
    notas.forEach((nota, index) => nota.value = datos[index]);
}
