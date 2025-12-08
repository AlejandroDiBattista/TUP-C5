const API_KEY = 'ca4ae18a8625a1102379cf9b58e65b07';

async function ApiCallClima(nombreCiudad){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${nombreCiudad}&appid=${API_KEY}&units=metric&lang=en`)
        if (response.ok) {
            const data = await response.json()
            console.log(data,"datos")
            return{ 
                status:response.status,
                data:data
            }
        }
        return {
           status:response.status,
           data:null
        }          
    } catch (error) {

    }
   

}


