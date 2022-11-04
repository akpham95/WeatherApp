
const container = document.querySelector(".container"),
inputPart = container.querySelector(".input-part"),
infoText = inputPart.querySelector(".info-text"),
inputField = inputPart.querySelector("input"),
locationBtn = inputPart.querySelector("button"),
weatherPart = container.querySelector(".weather-part"),
arrowBack = container.querySelector("header i"),
weatherIcon = container.querySelector("img")




let API_KEY = "4e88f34c9dd34ddc60fee407eea5749c"
let url;

inputField.addEventListener("keyup", function(event) {
    if (event.key === "Enter" && inputField.value != ""){
        requestApi(inputField.value);
}
})

locationBtn.addEventListener("click", () =>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else{
        alert("Cannot get current location");
    }  
});

function onSuccess(position){
    const {latitude, longitude} = position.coords;
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${API_KEY}`;
    fetchData();
}
function onError(error){
    infoText.innerText = error.message;
    infoText.classList.add("error");
}

function requestApi(city){
    infoText.innerText = "Getting weather details...";
    infoText.classList.add("pending");
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${API_KEY}`;
    fetchData();
}

function fetchData(){
    infoText.innerText = "Getting weather details...";
    infoText.classList.add("pending");
    fetch(url).then(res => res.json()).then(result => weatherDetails(result)).catch(() => {
        infoText.innerText = "Could not fetch data";
        infoText.classList.replace("pending", "error");
})

function weatherDetails(info){
    
    if(info.cod == "404"){
        infoText.classList.replace("pending", "error");
        infoText.innerText = `${inputField.value} isn't a valid city name`;
    }else{
        // get the properties value from our response info object
        const city = info.name;
        const country = info.sys.country;
        const {description} = info.weather[0];
        const {feels_like, humidity, temp} = info.main
        


        //pass our data into our DOM elements

        weatherPart.querySelector(".temp .number").innerText = Math.floor(temp)
        weatherPart.querySelector(".weather-info").innerText = description
        weatherPart.querySelector(".location span").innerText = `${city}, ${country}`
        weatherPart.querySelector(".temp .number-2").innerText = Math.floor(feels_like)
        weatherPart.querySelector(".humidity span").innerText = `${humidity}%`
        



        infoText.classList.remove("pending", "error");
        infoText.innerText = "";
        inputField.value = "";
        container.classList.add("active") //add active to our container class to hide our input-part
        console.log(info)
    }
   
}
arrowBack.addEventListener("click", ()=>{
    container.classList.remove("active"); // clicking back arrow removes the active class to show our input-part again
});
}
