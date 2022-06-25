
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
            getWeather(latitud, longitud) 

            principalCity = document.createElement("h2")
            principalCity.classList.add('city')
            principalCity.textContent = i.name   

            principalState = document.createElement('h4')
            principalState.classList.add('state')
            principalState.textContent = `${i.state},${i.country}`

            cityContainer = document.createElement('div')
            cityContainer.classList.add('city-container')        
            cityContainer.append(principalCity, principalState)   
            
            cards.appendChild(cityContainer)
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

    createCard(obteniendo)  
    console.log("Objeto Principal " , obteniendo)
    console.log("Objeto clima " , clima)

}


//Creando la cards del HTML
 function createCard(arrayGeo){
    // console.log("objeto en create cards " , arrayGeo)

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
    // temperature.textContent = temp.temp
    temperature.classList.add('principal-temp')
    const rangeTemp = document.createElement("p")
    rangeTemp.classList.add('min-max_temp')
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


