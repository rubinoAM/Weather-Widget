$(document).ready(function(){
    $('#weather-form').submit((e)=>{
        e.preventDefault();
        //console.log("BARK");

        const zip = $('.zip-code').val();
        //console.log(zip);
        const weatherURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&units=imperial&appid=${apiKey}`;
        //console.log(weatherUrl);

        $.getJSON(weatherURL,(weatherData)=>{
            console.log(weatherData);
            const currTemp = weatherData.main.temp;
            const temps = {
                curr: weatherData.main.temp,
                max: weatherData.main.temp_max,
                min: weatherData.main.temp_min
            }
            const newHTML = `
                <div>
                    <img src="https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png" />
                    <span>The temperature in ${weatherData.name} is currently ${temps.curr} &deg;</span>
                </div>
            `;
            $('.weather-data').html(newHTML);
        })
    })
})