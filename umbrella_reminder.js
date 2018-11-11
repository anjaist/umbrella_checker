const rain = document.querySelector(".rain");
const searchButton = window.document.getElementById("btn-search");
const searchBox = document.getElementById("city-search");
let userSearch = "";
const apiKey = 'LuvtMm2dFMDIvmKraeXmpQgrLJ02ntwb';
const message = document.querySelector(".message");
const umbrella = document.querySelector(".umbrella");
const people = ['2', '3', '4', '5', '6', '7', '8', '9'];
const personImage = document.querySelector(".person");
const person = people[Math.floor(Math.random()*people.length)];

// getRain should return a number, rain probability.
// should display 'you (don't) need an umbrella'
const getRain = (cityId) => {
  const urlWeather = `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${cityId}?apikey=${apiKey}&details=true&metric=true`;
  fetch(urlWeather).then((response) => response.json()).
    then((data) => {
      const hoursOfRain = data["DailyForecasts"][0]["Day"]["HoursOfRain"];
      const rainProbability = data["DailyForecasts"][0]["Day"]["RainProbability"];
      const rainAmount = data["DailyForecasts"][0]["Day"]["Rain"]["Value"];
      message.innerHTML = `<li>Hours of rain: ${hoursOfRain}</li><li>Probability of rain: ${rainProbability}</li><li>Amount of rainfall: ${rainAmount}mm</li>`;
      if (rainAmount === 0) {
        umbrella.innerText = "You don't need an umbrella today!";
      } else if (rainAmount <= 2) {
        umbrella.innerText = "You should probably take an umbrella today!";
        rain.src = "images/raindrops.png";
      } else if (rainAmount > 2) {
        umbrella.innerText = "Definitely take an umbrella! Happy swimming.";
        rain.src = "images/raindrops2.png";
      }
    });
};

// gets city id from api to be used in the weather api aboce
const getCityId = (city) => {
  const urlCity = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${city}`;
  fetch(urlCity).then((response) => response.json())
    .then((data) => {
      getRain(data[0]["Key"]);
    });
};

searchButton.addEventListener("click", (event) => {
  userSearch = searchBox.value.trim();
  getCityId(userSearch);
  personImage.src = `images/person${person}.svg`;
});

searchBox.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    userSearch = searchBox.value.trim();
    getCityId(userSearch);
    personImage.src = `images/person${person}.svg`;
  }
});
