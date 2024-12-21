const monthNames = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня",
    "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"
  ];

function appendInPage(where, what){
    document.getElementById(where).textContent = what;
}

window.onload = function() {
    fetch('http://192.168.55.61:3000/weather', { 
        method: 'GET'
    })
    .then(function(response) { return response.json(); })
    .then(data => {
        let date = new Date(data.today);
        const condition =
            data.condition.charAt(0).toUpperCase()
            + data.condition.slice(1)


        document.getElementById('city').textContent = data.city;
        document.getElementById('today').textContent = "Сейчас " + date.getDate() + " " + monthNames[date.getMonth()];
        document.getElementById('condition').textContent = condition;
        document.getElementById('temperature_current').textContent = data.temperature.current + "°C"; 
        document.getElementById('temperature_day').textContent = data.temperature.day + "°C"; 
        document.getElementById('temperature_sunset').textContent = data.temperature.sunset + "°C"; 
        document.getElementById('temperature_sunrise').textContent = data.temperature.sunrise + "°C"; 
        document.getElementById('feels_like').textContent = "Ощущается как " + data.feels_like + "°C";
        document.getElementById('wind_speed').textContent = data.wind_speed + " м/с, С"; 
        document.getElementById('humidity').textContent = data.humidity + "%"; 
        document.getElementById('pressure_mm').textContent = data.pressure_mm + " мм рт. ст."; 
    });
}