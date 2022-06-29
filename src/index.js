


//Evento con teclado
const enter = document.getElementById("ciudad")
enter.addEventListener("keydown", function(e){
    if(e.keyCode ===13){
        getCities()
    }
})
const busquedaFF = document.getElementById("buscar")
busquedaFF.addEventListener("click", getCities)
cards.innerHTML = " "
error.innerHTML = " "


//API geolocalizacion para consumir latitud y longitud de c/ciudad
var rta
    async function getCities(){
    const respt = await fetch (`http://api.openweathermap.org/geo/1.0/direct?q=${inputCiudad.value}&limit=2&appid=${apiKey}`)
    rta = await respt.json();
    console.log("Data geolocalizacion ", rta)
    cards.innerHTML = " "
    error.innerHTML = " "
    if(rta.length != 0){
        rta.forEach((i) => {
            let latitud = i.lat;
            let longitud = i.lon;

            //API para consumir el clima
            async function getWeather(){
            const get = await fetch (`${base_API}?lat=${latitud}&lon=${longitud}&appid=${apiKey}&units=metric`)
            const climateArray = await get.json()
            console.log("Objeto principal", climateArray)
            createCard(climateArray, i)
            }
            getWeather()
        }) 
    }else{
        const msjError = document.createElement("p")
        msjError.textContent = ("No se encontró ninguna ciudad 😥")
        error.append(msjError)
    }
    
}


//Creando la cards del HTML
var currentTime = new Date();
function createCard(arrayClima, arrayGeo){
    const mainTemp = arrayClima.main;
    const descript = arrayClima.weather[0]
    const speedA = arrayClima.wind;
    
    const card = document.createElement("div")
    card.classList.add ("cards")

    const principalCity = document.createElement("h2")
    principalCity.classList.add('city')
    principalCity.textContent = arrayGeo.name   
    const principalState = document.createElement('h4')
    principalState.classList.add('state')
    principalState.textContent = `${arrayGeo.state}, ${arrayGeo.country}` 
    const cityContainer = document.createElement('div')
    cityContainer.classList.add('city-container')        
    cityContainer.append(principalCity, principalState)  
    
    const timeContainer = document.createElement('div')
    timeContainer.classList.add("time-container")
    const clock = document.createElement('div')
    clock.classList.add("clock")
    clock.textContent = currentTime.toLocaleTimeString()
    const icon = document.createElement('img')
    icon.classList.add('icon')
     if (descript.description.includes("clear") || descript.description.includes("sunny") == true){
        icon.setAttribute('src', 'https://i.ibb.co/sKWC1hL/sunny.png')
    }else if( descript.description.includes("few clouds")) {
        icon.setAttribute('src', 'https://i.ibb.co/9hMpHYB/every.png')
    }else if(descript.description.includes("rain")){
        icon.setAttribute('src', 'https://i.ibb.co/fr1nJLJ/rain.png')
    }else if(descript.description.includes("overcast") || (descript.description.includes("broken")) || (descript.description.includes("clouds"))){
        icon.setAttribute('src', 'https://i.ibb.co/mDyB33F/cloudly.png')
    }else if(descript.description.includes("thunderstorm")){
        icon.setAttribute('src', 'https://i.ibb.co/7Q93d83/storm-jpg-removebg-preview.png')
    }
    timeContainer.append(clock, icon)

    const tempContainer = document.createElement('div')
    tempContainer.classList.add('temp-container')
    const temperature = document.createElement('h1')
    temperature.classList.add('principal-temp')
    temperature.textContent = Math.trunc(mainTemp.temp) + "°"
    const rangeTemp = document.createElement("p")
    rangeTemp.classList.add('min-max_temp')
    rangeTemp.textContent = `Temp. max-min ${Math.trunc(mainTemp.temp_max)}°/${Math.trunc(mainTemp.temp_min)}°`
    tempContainer.append(temperature, rangeTemp)

    const descriptionContainer = document.createElement('div')
    descriptionContainer.classList.add('descriptions-container')
    const description = document.createElement('p')
    description.classList.add("description-climate")
    description.textContent = `Descripción: ${descript.description}`
    const sensation = document.createElement('p')
    sensation.classList.add('feels-like')
    sensation.textContent = `Sensación de ${parseInt(mainTemp.feels_like)}°`
    const speed = document.createElement('p')
    speed.classList.add('speed')
    speed.textContent = `Velocidad viento: ${parseInt(speedA.speed)*3.6}km/h` 
    const humidity = document.createElement('p')
    humidity.classList.add('humidity')
    humidity.textContent = (`Humedad: ${mainTemp.humidity}%`)
    descriptionContainer.append(sensation, description, speed, humidity)
    

    card.append(cityContainer, timeContainer, tempContainer, descriptionContainer)
    cards.appendChild(card)
}

