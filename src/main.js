import './styles.css';
console.log('hello world!');

async function getData(){
    const apiFetch = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/singapore?unitGroup=metric&key=9VKUDM7Q8M8GXRWBKGD9F9MMZ&contentType=json');
    const data = await apiFetch.json(); 
    console.log(data);
    let daysArray = data.days;
    for (let i = 0; i < daysArray.length; i++){
        console.log(daysArray[i].tempmax);
    }
}

getData();
