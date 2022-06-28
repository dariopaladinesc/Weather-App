
const base_API = 'https://api.openweathermap.org/data/2.5/weather'
const apiKey= '0b5d5d30a262ea49fab0b87b861d3f03'


cards.innerHTML = " "

// busqueda.addEventListener('submit', getCities())
//API geolocalizacion para consumir latitud y longitud de c/ciudad
var rta
    async function getCities(){
    const respt = await fetch (`http://api.openweathermap.org/geo/1.0/direct?q=${inputCiudad.value}&limit=2&appid=${apiKey}`)
    rta = await respt.json();
    console.log("Data geolocalizacion ", rta)
    cards.innerHTML = " "
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
        alert ("no se encontró ninguna ciudad")
    }
    footer2.classList.add("footer2")
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
    icon.setAttribute('src', '/pic.png')
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


//Create Nav & Footer

const footerDescrpt = document.createElement('p')
footerDescrpt.classList.add('footerName');
footerDescrpt.textContent = ('Made with 💙 by: Dario Paladines C.')

