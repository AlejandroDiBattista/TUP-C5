# Resultado Final

## RECUPERACIÓN
> [!NOTE]
> Estos alumnos tienen hasta el lunes 8 para presentar las correcciones
>
58736 - **Juarez Hindi**, Lucas David           
> **Corregir TP3**
>
> *No permite agregar cuando se esta editando*
>
> *No respeta el diseño original*
>

58721 - **Juncos**, Gonzalo Sebastian           
> **Corregir TP3**
>
> *La alta de producto aunque cancele igual agrega un producto*
>


#### Promocionados
1. 55681 - **Bustos**, Mauricio Benjamin           
1. 55457 - **Carranza**, Javier                    
1. 58895 - **Flores Gonzalez**, Tomas              
1. 59154 - **Garcia**, Máximo                      
1. 59076 - **Gomez Martinez**, Matias              
1. 58894 - **Gonzalez Nacusse**, Flavia            
1. 58720 - **Gonzalez**, Martín Natanael           
1. 59068 - **Gonzalez**, Silvina Mariela           
1. 58786 - **Gutierrez**, Augusto Pedro            
1. 58761 - **Juarez**, Lautaro Andres              
1. 58758 - **Juarez**, Milagro Macarena            
1. 58756 - **Lazarte**, Agustina Milagro           
1. 58727 - **Lazarte**, Lucas                      
1. 59099 - **Moyano Berrondo**, Tahiel L           
1. 58805 - **Prieto**, Matias Hernan               
1. 59054 - **Rahman Rintoul**, Ramiro              
1. 58766 - **Reinoso**, Lisandro Gabriel           
1. 58806 - **Rojas**, Carlos Augusto               
1. 58845 - **Terrera**, Augusto Dante              
1. 59188 - **Vaca**, Andres Emanuel                

#### Regulares
1. 58773 - **Elli Salazar**, Gerónimo              
1. 55578 - **Fernandez Dumit**, Patricio           
1. 58735 - **Fernandez Gomez**, Manuel             
1. 58723 - **Figueroa**, Santiago Isaac            
1. 58734 - **Galvan**, Victor Mateo                
1. 58740 - **Garcia**, Sergio Martín               
1. 59135 - **Gomez**, Facundo Matias               
1. 59488 - **Gonzalez**, Mariano Emanuel           
1. 58880 - **Gutierrez**, Cecilia Ana Lu           
1. 58687 - **Jadur**, Sofia Nahir                  
1. 59070 - **Ladina**, Maia Agostina               
1. 58737 - **Lasagna**, Manuel                     
1. 59152 - **Lopez Chipoloni**, Agustin            
1. 58724 - **Lopez Garcia**, Marcos Juli           
1. 58726 - **Lopez**, Fausto Agustin               
1. 58729 - **Lovey**, Mathias Exequiel             
1. 59071 - **Medina**, Daiana Micaela              
1. 59001 - **Peralta**, Axel Rubens                
1. 58753 - **Rivadeneira**, Lautaro                
1. 58951 - **Robles**, Ezequiel                    
1. 58686 - **Rodriguez**, Gustavo                  
1. 58692 - **Rosello Salas**, Maia Josef           
1. 58873 - **Salazar**, Enzo Gabriel               
1. 55870 - **Stemberger**, Emiliano                
1. 59052 - **Teseira**, Lucas Benjamin             
1. 57543 - **Touceda**, Federico                   
1. 59064 - **Urbani**, Juan Pablo                  
1. 58899 - **Villagra**, Juan Gabriel              
1. 59909 - **Wierna**, Belén                       

#### Libres
1. 58781 - **Frias Armengol**, Facundo             
1. 55751 - **Jeréz**, Francisco David              
---
## ¿Cómo se rinde el examen final?

Para rendir, debes desarrollar y defender una aplicación que:

> **Implemente una agenda de contactos multiusuario**

La misma debe ser desarrollada en *React*, implementando la funcionalidad usando *Express* y persistiendo los datos con *MongoDB*.

La defensa consistirá en ejecutar la aplicación para mostrar la funcionalidad y, si está correctamente implementada, deberás mostrar el código fuente y explicar cómo funcionan las partes que se te indiquen.

### Funcionalidad requerida
1. En la esquina superior izquierda debe ir el nombre del sitio.
2. En la esquina superior derecha deben haber dos botones: "Registrar" e "Ingresar", cuando no haya ningún usuario identificado.
3. Cuando el usuario haya ingresado, en la esquina izquierda debe estar el nombre del usuario y un botón "Salir".
4. Al pulsar en el nombre del usuario se debera poder editar los datos del mismo.
5. El sitio debe mostrar inicialmente una lista de contactos públicos ordenados por apellido y nombre.
6. El usuario que se registre podrá agregar nuevos contactos.
7. Los usuarios, al identificarse, podrán ver sus propios contactos y los contactos públicos que estén visibles.
8. Los usuarios son propietarios de los contactos que crean, siempre podrán visualizar sus contactos, editarlos o borrarlos. 
9. Los usuarios podrán hacer público o poner privado sus contactos mediante un botón asociado a los mismos.
10. Las altas y la edición, así como la registración y el ingreso, se deben hacer en una página separada y, al completar la misma, debe regresar a la página principal.
11. Debe existir un usuario administrador que pueda visualizar todos los contactos, ya sean públicos o privados, estén visibles o no.
12. El usuario administrador puede ocultar o mostrar los contactos públicos mediante un botón que aparece en cada contacto.
13. Los usuarios se deben guardar como contactos privados con una contraseña asociada. 
14. Los usuarios no deberan aparecer en el listado de contactos.

Los contactos deben tener:
- Nombre y Apellido (obligatorio)
- Empresa     
- Domicilio   
- Teléfonos 
- Email       (obligatorio)
- Propietario (usuario que lo creó)
- Es Público  (definido por el usuario propietario)
- Es Visible  (definido por el administrador)
- Contraseña  (en caso de ser un usuario)