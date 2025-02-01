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

// importing icons for high and low temperature
import highTemp from './img/high-temp.svg';
import lowTemp from './img/low-temp.svg';

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


function updateToday(todayObject){
    if (!todayObject){
        console.error('Invalid object passed to updateToday function');
        return;
    }
    updateTodayIcon(todayObject);
    updateTodayTemperature(todayObject);
    updateTodayConditions(todayObject);
}

function createHourHeader(hourObject){
    const [hours, minutes, seconds] = hourObject.datetime.split(':');
    let hoursInt = parseInt(hours, 10); 

    const ampm = hoursInt <= 12? 'AM': 'PM';
    hoursInt = hoursInt % 12 || 12; 

    const hoursDiv = document.createElement('div'); 
    hoursDiv.classList.add('font-semibold')
    hoursDiv.innerText = `${hoursInt} ${ampm}`

    const hoursDivWrapper = document.createElement('div');
    hoursDivWrapper.classList.add('flex', 'justify-center');
    hoursDivWrapper.appendChild(hoursDiv);

    return hoursDivWrapper;
}

function createHourIcon(hourObject){
    const hourIcon =  document.createElement('div'); 
    hourIcon.classList.add('w-10', 'h-10');
    hourIcon.innerHTML = images[hourObject.icon]; 
    
    const hourIconDiv = document.createElement('div');
    hourIconDiv.classList.add('flex', 'justify-center', 'items-center');
    hourIconDiv.appendChild(hourIcon);

    return hourIconDiv;
}

function createHourTemp(hourObject){
    const hourTemp = document.createElement('div'); 
    hourTemp.innerText = `${hourObject.temp}\u00b0`;

    const hourTempDiv = document.createElement('div');
    hourTempDiv.classList.add('flex', 'justify-center');
    hourTempDiv.appendChild(hourTemp);

    return hourTempDiv;
}

function createHourArray(todayObject, tmrwObject){
    const now = new Date();
    const currentHour = now.getHours();
    const hoursContainer = document.querySelector('#hoursContainer');
    while (hoursContainer.firstChild){
        hoursContainer.removeChild(hoursContainer.firstChild);
    }
    for (let i = 0; i < 12; i++){
        const hourDiv = document.createElement('div');
        hourDiv.classList.add('px-3', 'w-20', 'shrink-0', 'flex', 'flex-col', 'border', 'rounded-3xl');

        const hourIndex = (currentHour + i) % 24; 
        const isToday = hourIndex + i > 24; 
        const hourObject = isToday ? todayObject.hours[hourIndex] : tmrwObject.hours[hourIndex];

        const hourHeader = createHourHeader(hourObject);
        const hourIcon = createHourIcon(hourObject);
        const hourTemp = createHourTemp(hourObject);

        hourDiv.appendChild(hourHeader);
        hourDiv.appendChild(hourIcon);
        hourDiv.appendChild(hourTemp);

        hoursContainer.appendChild(hourDiv);
    }
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
    header.classList.add('font-bold', 'text-sm', 'p-2')
    const dates = dayObject.datetime.split('-');
    header.innerHTML = `${month[dates[1]]} ${dates[2]}`; 
    return header;
}

function createDayIcon(dayObject){
    const dayIcon = document.createElement('div'); 
    dayIcon.innerHTML = images[dayObject.icon]; 
    dayIcon.classList.add('w-20');

    const dayIconDiv = document.createElement('div');
    dayIconDiv.classList.add('flex', 'justify-center', 'items-center', 'h-20');
    dayIconDiv.appendChild(dayIcon);
    return dayIconDiv;
}

function createDayTemperature(dayObject){
    const temperatureContainer = document.createElement('div');
    temperatureContainer.classList.add('flex', 'justify-center');

    const highTempDiv = document.createElement('div'); 
    highTempDiv.classList.add('flex', 'px-3');

    const highTempSvg = document.createElement('div'); 
    highTempSvg.classList.add('w-7')
    highTempSvg.innerHTML = highTemp; 

    const highTempText = document.createElement('span');
    highTempText.classList.add('text-sm', 'font-semibold', 'flex', 'items-center');
    highTempText.innerText = `${dayObject.tempmax}\u00b0`; 

    highTempDiv.appendChild(highTempSvg);
    highTempDiv.appendChild(highTempText);

    const lowTempDiv = document.createElement('div');
    lowTempDiv.classList.add('flex');

    const lowTempSvg = document.createElement('div'); 
    lowTempSvg.classList.add('w-7')
    lowTempSvg.innerHTML = lowTemp; 

    const lowTempText = document.createElement('span'); 
    lowTempText.innerText = `${dayObject.tempmin}\u00b0`; 
    lowTempText.classList.add('text-sm', 'font-semibold', 'flex', 'items-center');

    lowTempDiv.appendChild(lowTempSvg);
    lowTempDiv.appendChild(lowTempText);
    
    temperatureContainer.appendChild(highTempDiv); 
    temperatureContainer.appendChild(lowTempDiv);

    return temperatureContainer;
}

function createConditions(dayObject, imgsrc, property){
    const container = document.createElement('div');
    container.classList.add('flex', 'p-1');
    const image = document.createElement('img');
    image.src = imgsrc; 
    image.classList.add('w-5');

    const data = document.createElement('div');
    data.innerText = dayObject[property];
    data.classList.add('text-xs', 'p-1');

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
    
    conditionContainer.classList.add('flex')

    return conditionContainer; 
}

function createDaysArray(daysArray){
    const arrayContainer = document.querySelector('#daysContainer');
    while (arrayContainer.firstChild){
        arrayContainer.removeChild(arrayContainer.firstChild);
    }
    for (let i = 1; i < daysArray.length; i++){
        const dayContainer = document.createElement('div');
        dayContainer.classList.add('shrink-0', 'w-40', 'border', 
        'rounded-3xl'
        );
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

export {updateToday, createDaysArray, createHourArray};
