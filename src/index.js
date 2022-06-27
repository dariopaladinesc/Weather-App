
const base_API = 'https://api.openweathermap.org/data/2.5/weather'
const apiKey= '0b5d5d30a262ea49fab0b87b861d3f03'

const inputCiudad = document.getElementById("ciudad")
// cards.innerHTML = " "


//API geolocalizacion para consumir latitud y longitud de c/ciudad
async function getCities(){
    const respt = await fetch (`http://api.openweathermap.org/geo/1.0/direct?q=${inputCiudad.value}&limit=2&appid=${apiKey}`)
    const rta = await respt.json();
    console.log("Data geolocalizacion ", rta)
    cards.innerHTML = " "
    if(rta.length != 0){
        rta.forEach((i) => {
            const latitud = i.lat;
            const longitud = i.lon;
            createCityState(i)
            getWeather(latitud, longitud) 
          
        }) 
    }else{
        console.log("no hubo ninguna coincidencia")
    }   
}


//API para consumir el clima
async function getWeather(lat, long){
    const get = await fetch (`${base_API}?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`)
    const obteniendo = await get.json()
    const clima = obteniendo.main
    console.log("Objeto principal", obteniendo)
    console.log("Objeto Clima", clima)
    createCard(obteniendo)
   
    
}

function createCityState(arrayGeo){
    principalCity = document.createElement("h2")
    principalCity.classList.add('city')
    principalCity.textContent = arrayGeo.name   
    principalState = document.createElement('h4')
    principalState.classList.add('state')
    principalState.textContent = `${arrayGeo.state}, ${arrayGeo.country}` 
    
    cityContainer = document.createElement('div')
    cityContainer.classList.add('city-container')        
    cityContainer.append(principalCity, principalState)  
    
    cards.appendChild(cityContainer)
}
//Creando la cards del HTML
 function createCard(arrayClima){
    const mainTemp = arrayClima.main;
    
    const timeContainer = document.createElement('div')
    timeContainer.classList.add("time-container")
    const clock = document.createElement('div')
    clock.classList.add("clock")
    const icon = document.createElement('img')
    icon.classList.add('icon')
    icon.setAttribute('src', '')
    timeContainer.append(clock, icon)

    const tempContainer = document.createElement('div')
    tempContainer.classList.add('temp-container')
    const temperature = document.createElement('h1')
    temperature.classList.add('principal-temp')
    temperature.textContent = Math.trunc(mainTemp.temp) + "°"
    const rangeTemp = document.createElement("p")
    rangeTemp.classList.add('min-max_temp')
    rangeTemp.textContent = `${Math.trunc(mainTemp.temp_max)}° - ${Math.trunc(mainTemp.temp_min)}°`
    tempContainer.append(temperature, rangeTemp)

    const descriptionContainer = document.createElement('div')
    descriptionContainer.classList.add('descriptions-container')
    const sensation = document.createElement('p')
    sensation.classList.add('feels-like')
    const description = document.createElement('p')
    description.classList.add("description-climate")
    const speed = document.createElement('p')
    speed.classList.add('speed')
    const humidity = document.createElement('p')
    humidity.classList.add('humidity')
    descriptionContainer.append(sensation, description, speed, humidity)
    

    cards.append(timeContainer, tempContainer, descriptionContainer)
}


