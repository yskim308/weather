import './styles.css';
import { updateToday, createDaysArray, createHourArray } from './dom';

const searchForm = document.querySelector('#locationSearch');
searchForm.addEventListener('submit', (event)=>{
    event.preventDefault();
    let locationString = document.querySelector('#locationString').value;
    getData(locationString);
    event.target.reset();

});


async function getData(locationString){
    const apiFetch = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationString}?unitGroup=metric&key=9VKUDM7Q8M8GXRWBKGD9F9MMZ&contentType=json`, {mode: 'cors'});
    const data = await apiFetch.json(); 
    console.log(data);
    let daysArray = data.days;
    updateToday(daysArray[0]); 
    createHourArray(daysArray[0], daysArray[1]);
    createDaysArray(daysArray);
    document.querySelector('#locationDiv').innerText = data.resolvedAddress;
    document.querySelector('#todayDescription').innerText = data.description;
}

getData();

