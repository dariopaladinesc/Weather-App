
const apiKey = '0b5d5d30a262ea49fab0b87b861d3f03'
const apiKeyClima = 'a6ab8e910a3876fa2b1dc40b64c5a424'
const base_API = 'https://api.openweathermap.org/data/2.5/weather'
"lat={lat}&lon={lon}&appid={API key}"



const ciudad = document.getElementById("ciudad")


  

//API geolocalizacion para consumir lat y lon de c/ciudad
async function getCities(){
     
    const respt = await fetch (`http://api.openweathermap.org/geo/1.0/direct?q=${ciudad.value}&appid=${apiKey}`)
    const rta = await respt.json();
    const city = rta[0]
    console.log("API DE GEOLOCALIZACION ", rta)
    let latitud = city.lat;
    let longitud = city.lon;
    console.log("LATITUD LONGITUD", latitud, longitud)
    
    async function getWeather(){
        const get = await fetch (`${base_API}?lat=${latitud}&lon=${longitud}&appid=${apiKeyClima}`)
        const obteniendo = get.json()
        const clima = obteniendo.main
        console.log("API DEL CLIMA " , obteniendo)
        
        }
        getWeather()
}

