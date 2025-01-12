import './styles.css';
console.log('hello world!');

const searchForm = document.querySelector('#locationSearch');
searchForm.addEventListener('submit', (event)=>{
    event.preventDefault();
    let locationString = document.querySelector('#locationString').value;
    console.log(locationString)
    event.target.reset();

    getData(locationString);
});


async function getData(locationString){
    const apiFetch = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationString}?unitGroup=metric&key=9VKUDM7Q8M8GXRWBKGD9F9MMZ&contentType=json`, {mode: 'cors'});
    const data = await apiFetch.json(); 
    console.log(data);
    let daysArray = data.days;
    for (let i = 0; i < daysArray.length; i++){
        console.log(daysArray[i].tempmax);
    }
}

