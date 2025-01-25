// importing images from img/ directory 
const images = {}
const requireContext = require.context('./img', false, /\.png$/);
requireContext.keys().forEach((filePath)=>{
    // make key for images the name of file without .png 
    const fileName = filePath.replace('./', '').replace('.png', '');
    images[fileName] = requireContext(filePath);
})

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
export {updateToday};
