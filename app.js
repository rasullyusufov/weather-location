

const inputEl = document.getElementById('input')
const btn = document.querySelector('.btn')
const back = document.getElementById('back')
const alertEl = document.querySelector('.alertdiv')
const aside = document.querySelector('aside')
const infoText = document.querySelector('.infoTet')
let api
let API_key = '467143a2e9e1de3de89328bf80dd0625';
let address

btn.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSucces, OnError)
    }
    else {
        alert("Your Browser not support geolocation api")
    }
})
function onSucces(position) {
    const { latitude, longitude } = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_key}`
    fetchData()

}

function OnError(error) {
    alertEl.innerText = error.message
    alertEl.classList.add('error')
}

inputEl.addEventListener("keyup", e => {
    if (e.key == "Enter" && inputEl.value != "") {
        requestAPI(inputEl.value);
    }
})
function requestAPI(city) {
    API_key = '467143a2e9e1de3de89328bf80dd0625';
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_key}`
    fetchData()
}
function fetchData() {
    alertEl.innerHTML = ` Getting weather detalist...`
    alertEl.classList.add('succses')
    fetch(api).then(response => response.json()).then(result => weatherDetalist(result))
}
function weatherDetalist(info) {

    setTimeout(() => {
        alertEl.remove()
    }, 2000);
    if (info.cod == '404') {

        alertEl.classList.replace('succses', 'error')
        alertEl.innerHTML = `${inputEl.value} isn't  a valid city name`
       
    }
    
    else {
        const id = info.weather[0].id
        if (id == 800) {
            weatherIcon = "./icons/clear.svg"
        }
        else if (id >= 200 && id <= 232) {
            weatherIcon = "./icons/strom.svg"
        }
        else if (id >= 600 && id <= 632) {
            weatherIconc = "./icons/snow.svg"
        }
        else if (id >= 701 && id <= 781) {
            weatherIcon = "./icons/haze.svg"
        }
        else if (id >= 801 && id <= 804) {
            weatherIcon = "./icons/cloud.svg"
        }
        else if ((id >= 300 && id <= 321) || (id >= 500 && id <= 531)) {
            weatherIcon = "./icons/rain.svg"
        }
       

        const temp = `${Math.round(info.main.temp)}`;
        const feels_like = (info.main.feels_like)
        const humidity = (info.main.humidity);

        alertEl.classList.remove("succses")
        const address = document.createElement('address')
        address.className = address;
        address.innerHTML = `
        <div class="header-info">
        <img class="img" src=${weatherIcon} alt="wether img">
        <div  id="degre" class="degre"><h1>${temp}<sup>◦</sup></h1></div>
        <div class="cityname" id="cityname"> <i class="fas fa-map-marker-alt"></i></i>${info.name}</div>
        
    </div>
    <div class="footer-info">
        <div class="info-footer">
            <div><img src="./img/icons8-temperature-96.png" alt=""></div>
       
        <div>
            <p>${feels_like} </p>
            <p>Felks info</p>
        </div> 
    </div>
        <div class="info-footer">
            <div><img src="./img/bxs-droplet.png" alt=""></div>
            <div>
                <p> ${humidity}</p>
                <p>Humndity</p>
            </div>
        </div>
    </div>
        `
        aside.appendChild(address)
        if (aside.children.length === 2) {
            aside.children[0].remove()
        }
        inputEl.value = ''
    }
}
back.addEventListener('click', () => {
    aside.remove(address)
})