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
                curr: Math.round(weatherData.main.temp),
                max: Math.round(weatherData.main.temp_max),
                min: Math.round(weatherData.main.temp_min),
            }
            const newHTML = `
                <div>
                    <img src="https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png" />
                    <span>The temperature in ${weatherData.name} is currently ${temps.curr} &deg;</span>
                </div>
            `;
            $('.weather-data').html(newHTML);
            animateTemp(0,currTemp);
        })
    })
})

const canvas = document.getElementById('canvas');
let currentPercent = 0;
let context = canvas.getContext('2d');
console.log(canvas);

function animateTemp(currentArc,currentTemp){
    context.lineWidth = 5;
    context.beginPath();
    context.arc(155,85,70,0,Math.PI*2);
    context.fillStyle = "#ccc";
    context.closePath();
    context.fill();

    let fifthArg = (Math.PI*2*currentArc + Math.PI * 1.5); //This is just the 5th argument for line 49. I just wanted to keep the actual code from going to far to the right.
    
    context.beginPath();
    context.arc(155,85,75,Math.PI*1.5,fifthArg); // Math.PI * 1.5 comes out to 12:00 on a circle
    context.stroke();

    //Update the arc % until we hit currentTemp
    currentPercent++;
    if(currentPercent < currentTemp){
        //requestAnimationFrame is kind of like a while loop
        requestAnimationFrame(()=>{
            animateTemp(currentPercent/100,currentTemp)
        })
    }
}