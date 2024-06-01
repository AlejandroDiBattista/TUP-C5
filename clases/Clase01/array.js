let a = [10, 20, 40]
a.length //> 3
a.length = 2 // [10, 20]
a.length = 0 //> []

a = [10, 20, 40,,]
a.length = 5 //> 

a[0] //> 10 | primer elemento
a[a.length-1] //> 40
a[20]
a[20] = 100

a.at(0) == a[0]
a.at(-1) == a[a.length-1] // ultimo
a.at(-2) == a[a.length-2] // penultimo

a = [10, 30]
a.include(4)
a.indexOf(20) //> -1
a.indexOf(10) //> 0

a.concat([1,2,3])

a.join("-") //> "10-20"
a = "Hola mundo cruel".split(" ")
// ["HOla", "mundo", "cruel"]

for(let i = 0; i < a.length;i++){
    let x = a[i]
    console.log(a)
}

suma = 0
for(let i = 0; i < a.length;i++){
    let x = a[i]
    suma += x 
}

for(let x of a){
    console.log(x)
}

for(let x of a)
    suma += x

typeof(a) //> object

for(let i in a){
    console.log(i)
}
