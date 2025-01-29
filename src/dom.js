// importing images from img/ directory 
const images = {}
const requireContext = require.context('./img', false, /\.svg$/);
requireContext.keys().forEach((filePath)=>{
    // make key for images the name of file without .png 
    const fileName = filePath.replace('./', '').replace('.svg', '');
    images[fileName] = requireContext(filePath);
})

// importing icons for weather conditions
import humidity from './img/humidity.png';
import rain from './img/rain.png';
import uv from './img/ultraviolet.png';


// updating the weather conditions for today
function updateTodayIcon(todayObject){
    const todayIcon = document.querySelector('#todayIcon');
    todayIcon.innerHTML = images[todayObject.icon];
    todayIcon.classList.add('w-20');
}

function updateTodayTemperature(todayObject){
    const temperature = document.querySelector('#temperature');
    while (temperature.firstChild){
        temperature.removeChild(temperature.firstChild);
    }
    const numberSpan = document.createElement('span');
    numberSpan.innerText = `${todayObject.temp}`;
    numberSpan.classList.add('text-4xl', 'font-semibold', 'self-center')
    temperature.appendChild(numberSpan);

    const degreeSpan = document.createElement('span');
    degreeSpan.innerText = '\u00b0C'; 
    degreeSpan.classList.add('self-start', 'pt-5', 'text-xl');
    temperature.appendChild(degreeSpan);
}

function updateTodayConditions(todayObject){

    const rainSpan = document.querySelector('#rainSpan');
    rainSpan.innerText = todayObject.precip; 
    const rainImg = document.querySelector('#rainImg');
    rainImg.src = rain;


    const humidSpan = document.querySelector('#humidSpan');
    humidSpan.innerText = todayObject.humidity; 
    const humidityImg = document.querySelector('#humidityImg');
    humidityImg.src = humidity; 

    const uvSpan = document.querySelector('#uvSpan'); 
    uvSpan.innerText = todayObject.uvindex; 
    const uvImg = document.querySelector('#uvImg');
    uvImg.src = uv;
}

function updateTodayDescription(todayObject){
    const todayDescription = document.querySelector('#todayDescription');
    todayDescription.innerText = todayObject.description;
}

function updateToday(todayObject){
    if (!todayObject){
        console.error('Invalid object passed to updateToday function');
        return;
    }
    updateTodayIcon(todayObject);
    updateTodayTemperature(todayObject);
    updateTodayConditions(todayObject);
    updateTodayDescription(todayObject);
}

// updating weather conditions for the other days (creation of the cards)
const month = {
    '01': 'Jan',
    '02': 'Feb',
    '03': 'Mar',
    '04': 'Apr',
    '05': 'May',
    '06': 'Jun',
    '07': 'Jul',
    '08': 'Aug',
    '09': 'Sep',
    '10': 'Oct',
    '11': 'Nov',
    '12': 'Dec'
}
function createDayHeader(dayObject){
    const header  = document.createElement('div');
    const dates = dayObject.datetime.split('-');
    header.innerHTML = `${month[dates[1]]} ${dates[2]}`; 
    return header;
}

function createDayIcon(dayObject){
    const dayIcon = document.createElement('img'); 
    dayIcon.src = images[dayObject.icon];
    return dayIcon;
}

function createDayTemperature(dayObject){
    const temperatureContainer = document.createElement('div');
    const max = document.createElement('div');
    const min = document.createElement('div'); 

    max.innerHTML = `max: ${dayObject.tempmax}`;
    min.innerHTML = `min: ${dayObject.tempmin}`;

    temperatureContainer.appendChild(max);
    temperatureContainer.appendChild(min);

    return temperatureContainer;
}

function createConditions(dayObject, imgsrc, property){
    const container = document.createElement('div');
    container.classList.add('flex');
    const image = document.createElement('img');
    image.src = imgsrc; 
    const data = document.createElement('div');
    data.innerText = dayObject[property];

    container.appendChild(image);
    container.appendChild(data);
    
    return container;
}

function createDayConditions(dayObject){
    const conditionContainer = document.createElement('div');

    const uvContainer = createConditions(dayObject, uv, 'uvindex');
    const precipContainer = createConditions(dayObject, rain, 'precip');
    const humidityContainer = createConditions(dayObject, humidity, 'humidity');

    conditionContainer.appendChild(uvContainer);
    conditionContainer.appendChild(precipContainer);
    conditionContainer.appendChild(humidityContainer);

    return conditionContainer; 
}

function createDaysArray(daysArray){
    const arrayContainer = document.querySelector('#daysContainer');
    for (let i = 1; i < daysArray.length; i++){
        const dayContainer = document.createElement('div');
        const header = createDayHeader(daysArray[i]);
        const icon = createDayIcon(daysArray[i]);
        const temp = createDayTemperature(daysArray[i]); 
        const conditions = createDayConditions(daysArray[i]);

        dayContainer.appendChild(header);
        dayContainer.appendChild(icon);
        dayContainer.appendChild(temp);
        dayContainer.appendChild(conditions);

        arrayContainer.appendChild(dayContainer);
    }
}

export {updateToday, createDaysArray};
