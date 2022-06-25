
const base_API = 'https://api.openweathermap.org/data/2.5/weather'
const apiKey= '0b5d5d30a262ea49fab0b87b861d3f03'


const inputCiudad = document.getElementById("ciudad")

//API geolocalizacion para consumir lat y lon de c/ciudad
async function getCities(){
    const respt = await fetch (`http://api.openweathermap.org/geo/1.0/direct?q=${inputCiudad.value}&limit=2&appid=${apiKey}`)
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

function createCard(){
    // cards.innerHTML = " "
    const cityContainer = document.createElement('div')
    cityContainer.classList.add('city-container')
    const principalCity = document.createElement("h2")
    principalCity.classList.add('city')
    const principalState = document.createElement('h4')
    principalState.classList.add('state')
    cityContainer.append(principalCity, principalState)

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


    cards.append(cityContainer, timeContainer, tempContainer, descriptionContainer)
}



