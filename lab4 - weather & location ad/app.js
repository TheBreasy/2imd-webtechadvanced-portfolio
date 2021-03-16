class App {
    constructor() {
        this.getLocation();
        this.lat;
        this.lng;
    }

    getLocation() {
        navigator.geolocation.getCurrentPosition(
            this.locationFound.bind(this),
            this.locationNotFound.bind(this));
    }

    locationFound(result) {
        this.lat = result.coords.latitude;
        this.lng = result.coords.longitude;
        this.getWeather();
    }

    getWeather() {
        let url = `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lng}&appid=e6d3ebb9c25da4aa5194a67a9f4235b2&units=metric`;

        fetch(url)
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(data => {
                document.querySelector("#weather").innerHTML = data.main.temp;
            })
    }

    locationNotFound(result) {
        console.log(result);
    }
}

let app = new App();