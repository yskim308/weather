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
    try{
        const apiFetch = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationString}?unitGroup=metric&key=9VKUDM7Q8M8GXRWBKGD9F9MMZ&contentType=json`, {mode: 'cors'});
        if (!apiFetch.ok){
            showError()
        }
        const data = await apiFetch.json(); 
        console.log(data);
        let daysArray = data.days;
        updateToday(daysArray[0]); 
        createHourArray(daysArray[0], daysArray[1]);
        createDaysArray(daysArray);
        document.querySelector('#locationDiv').innerText = data.resolvedAddress;
        document.querySelector('#todayDescription').innerText = data.description;
    }
    catch(error){
        showError()
    }
}

function showError() {
    const errorDiv = document.querySelector('#error');
    
    // Use classList instead of classlist (case-sensitive)
    errorDiv.classList.remove('hidden');  
    errorDiv.classList.add('opacity-0'); // Start with opacity 0 for a transition

    // Force a repaint so transition applies correctly
    setTimeout(() => {
        errorDiv.classList.add('opacity-100'); // Fade in
    }, 10);

    // Hide it after 3 seconds
    setTimeout(() => {
        errorDiv.classList.remove('opacity-100'); // Fade out
        errorDiv.classList.add('opacity-0');
        
        setTimeout(() => {
            errorDiv.classList.add('hidden'); // Hide after transition
        }, 500); // Match transition duration
    }, 3000);
}

getData();

