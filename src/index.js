
const base_API = 'https://api.openweathermap.org/data/2.5/weather'
const apiKey= '0b5d5d30a262ea49fab0b87b861d3f03'


const ciudad = document.getElementById("ciudad")

//API geolocalizacion para consumir lat y lon de c/ciudad
async function getCities(){
    const respt = await fetch (`http://api.openweathermap.org/geo/1.0/direct?q=${ciudad.value}&limit=2&appid=${apiKey}`)
    const rta = await respt.json();
    console.log("Data geolocalizacion ", rta)

    if(rta.length != 0){
        rta.forEach((i) => {

            let latitud = i.lat;
            let longitud = i.lon;
            // console.log("LATITUD LONGITUD", latitud, longitud)

            //API para consumir el clima
            async function getWeather(){
            const get = await fetch (`${base_API}?lat=${latitud}&lon=${longitud}&appid=${apiKey}&units=metric`)
            const obteniendo = await get.json()
            const clima = obteniendo.main
            console.log("Objeto Principal " , obteniendo)
            console.log("Objeto clima " , clima)

        }
        getWeather()
        })
        
    }else{
        console.log("no hubo ninguna coincidencia")
    }
    
}




