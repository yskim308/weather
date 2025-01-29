// importing images from img/ directory 
const images = {}
const requireContext = require.context('./img', false, /\.png$/);
requireContext.keys().forEach((filePath)=>{
    // make key for images the name of file without .png 
    const fileName = filePath.replace('./', '').replace('.png', '');
    images[fileName] = requireContext(filePath);
})

// importing icons for weather conditions
import humidity from './img/humidity.png';
import rain from './img/rain.png';
import uv from './img/ultraviolet.png';


// updating the weather conditions for today
function updateTodayIcon(todayObject){
    const todayIcon = document.querySelector('#todayIcon');
    console.log(todayObject.icon);
    console.log(images[todayObject.icon]);
    todayIcon.src = images[todayObject.icon];
}

function updateTodayTemperature(todayObject){
    const temperature = document.querySelector('#temperature');
    temperature.innerText = todayObject.temp;
}

function updateTodayConditions(todayObject){
    const todayConditions = document.querySelector('#todayConditions')
    todayConditions.children[0].innerText = `precipitation: ${todayObject.precip}`;
    todayConditions.children[1].innerText = `humidity: ${todayObject.humidity}`;
    todayConditions.children[2].innerText = `uv index: ${todayObject.uvindex}`;
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
function createDayHeader(dayObject){
    const header  = document.createElement('div');
    header.innerHTML = dayObject.datetime; 
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
