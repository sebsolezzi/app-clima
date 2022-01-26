const btn = document.querySelector('.btn').addEventListener('click', buscarClima);

async function buscarClima(e) {
    e.preventDefault();

    //valores a modificar en pantalla
    const input = document.querySelector('#input-ciudad');
    const city = document.querySelector('.ciudad');
    const temperatura = document.querySelector('.temperatura');
    const temperaturaMin = document.querySelector('.tmin');
    const temperaturaMax = document.querySelector('.tmax');
    const humedad = document.querySelector('.humedad');
    const clima = document.querySelector('.clima');
    const spinner = document.querySelector('.sk-folding-cube');
    const info = document.querySelector('.info');
    const icono = document.querySelector('.fas');
    
    const apiKey = '761697f82ac7aea23d2f93e1e4b43226';
    const ciudad = input.value

    if (!ciudad) return;
    
    try {

        info.style.display = "none";
        spinner.style.display = "block";

        //consultando la api
        let respuesta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&lang=es&appid=${apiKey}`);
        let datos = await respuesta.json();
        const {main,weather} = datos;
        
        //obteniendo info
        let hum = main.humidity;
        let temp = parseInt(main.temp - 273.15);
        let tempMax = parseInt(main.temp_max - 273.15);
        let tempMin = parseInt(main.temp_min - 273.15);
        
        setTimeout(() => {
            spinner.style.display = "none";
            info.style.display = "block";
        }, 3000);

        //removiendo iconos que pueden estar
        icono.classList.remove("fa-cloud","fa-sun");

        //icono de acuerdo al tipo de clima
        switch (weather[0].description) {
            case 'muy nuboso':
                icono.classList.add("fa-cloud");
                break;
            case 'nubes':
                icono.classList.add("fa-cloud"); 
                break;
            case 'nubes dispersas':
                icono.classList.add("fa-cloud");
                break;
            case 'cielo claro':
                icono.classList.add("fa-sun");
                break;
            default:
                icono.classList.add("fa-sun");
                break;
        }
        //mostrardo info
        city.textContent = ciudad.toUpperCase();
        temperatura.textContent = `${temp}ºC`;
        temperaturaMin.textContent = `Min: ${tempMax}ºC`;
        temperaturaMax.textContent = `Max: ${tempMin}ºC`;
        humedad.textContent = `Humedad del ${hum}%`;
        clima.textContent = weather[0].description.toUpperCase();
        input.value="";

    } catch (error) {
        spinner.style.display = "none";
        input.value="";
    }

}