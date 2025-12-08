# Trabajo Práctico 5

## Desarrollo de una API en el backend

El objetivo de este trabajo es realizar una API mínima que implemente dos funciones.

1. **GetAll**: Trae todas las personas desde el servidor.
2. **Set**: Modifica una persona en el servidor.

---
La idea es que el servidor tenga una base de datos (simulada como un array de objetos) de personas que se pueda consultar y actualizar.
Todas las personas deben tener un ID asignado en el servidor.

Si se intenta actualizar una persona que no tiene ID, el servidor debe asignarle uno y realizar un alta.

Si se pasa una persona con un ID, el servidor debe actualizar los campos que se le pasen. 

Si la persona a actualizar tiene el campo "borrado = true", debe realizarse un borrado lógico de la misma; es decir, debe ser marcada como borrada y no debe aparecer en los próximos listados, pero no debe ser eliminada de la base de datos.

Para verificar que la funcionalidad ha sido realizada con éxito, se han provisto **pruebas automatizadas**. 

Todas las pruebas deben ser superadas correctamente para que se considere que el trabajo está bien realizado.

Para realizar las funciones, se deben modificar las dos funciones "GET" y "PUT" en el archivo "src/app.js".

Para correr las pruebas, deben instalarse las dependencias una única vez mediante el comando `npm install`, y luego se deben correr los tests con el comando `npm run test`.

> [!NOTE]
>
> **Instrucciones para la presentación del trabajo**
> 
> 1. Cambiar a la rama principal (main).
> 2. Descargar la última versión del repositorio del curso (fetch).
> 3. Crear una nueva rama para tus cambios (new branch) (TP5-{alumno}).
> 4. Abrir la carpeta correspondiente a tu nombre de usuario (practicos/{alumno}/TP5).
> 5. **Implementar las funciones GET y PUT en app.js** (sin alterar ninguna otra carpeta).
> 6. **Correr todos los tests con `npm run test`**.
> 7. Confirmar los cambios (commit).
> 8. Realizar una solicitud de publicación (pull request).
> 9. Revisar que el pull request esté subido (solapa pull request en GitHub).

*Los cambios no aparecerán en el repositorio principal hasta que se acepte el pull request el día del vencimiento del plazo para entregar el trabajo.*

Fecha de entrega: 
- Comisión 3 y comisión 9: **Sábado  8 hasta las 13hs**
- Comisión 4 y comisión 5: **Domingo 9 hasta las 23hs**