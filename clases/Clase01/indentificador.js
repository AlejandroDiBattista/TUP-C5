const { signInWithPhoneNumber } = require("firebase/auth")

let a = 1000
let b = 1000.2 
let c = 0xF0FF00
let d = 0b1101
let e = 1.23e3 //>1230

a.toString() //> '1000'
a.toString(2) //> '1111101000'
a.toString(16) //> '3e8'

// Operaciones aritméticas
a + b //> 2000.2
a - b //> -0.2
a * b //> 1000200
a / b //> 0.9998
7 % 2 //> 1 | impar 

2 ** 3 //> 8 | 2^3

8 / 4 / 2

10 > 20 //> false
10 < 20 //> true
10 >= 10 //> true
10 <= 10 //> true
10 == 10 //> true

let x = y = 3 
let valor 
typeof valor //> undefined

valor = 100
typeof valor //> number
valor = "Hola"
typeof valor //> string

// Cadena string
let nombre = "Juan"
nombre = 'Juan'
nombre = "D'agata"
nombre = 'Juan "El rapido" vino..'

let expresion = `1+2=${1+2}`
expresion //> '1+2=3'
"1+2=" + 1 + 2 

nombre = "Juan"
apellido = "Perez"

nombre + " " + apellido 
`${nombre} ${apellido}`
"100" + 5 //> 1005
100 + "5" //> 1005
"100" - 5 //> 95
"100a" - 5 //> NaN

+"100" //>
parseInt("100") //> 100
parseFloat("100.5") //> 100.5 

Number("100") //> 100
Number("100a") //> NaN
"100" - 5 
Number("100") - 5 

10 / 0 //> Infinity
-10 / 0 //> -Infinity
0 / 0 //> NaN

isNaN(0 / 0) //> true


nombre.length //> 4
"Hola 👧🏽".length //> 

nombre.toUpperCase() //> "JUAN"
nombre.at(1) //> "u"
nombre[0] //> J
nombre[3] 
nombre[nombre.length-1]

nombre.at(2) == nombre[2]
nombre.at(-1) == nombre[nombre.length-1]

nombre.includes("J") //> true
nombre.includes("j") //> false
nombre.startsWith("J")

"Juan" < "juan"
"Juan".localeCompare("juan")

100 === "100" //> false
100 != "100" //> true
100 !== "100" //> true

let edad = 22

if(edad === 18)
    console.log("Mayor")

(10).toString()
String(100) //> 
String(NaN) //> "NaN"
String(true) //> "true"
String(false) //> "false"

let 