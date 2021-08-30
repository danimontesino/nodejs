const axios = require("axios");

class Search {
    constructor(history = []) {
        // read db if exist
        this._history = history;
    }

    get history(){
        return this._history;
    }

    get paramsMapBox() {
        return {
            "access_token": process.env.MAPBOX_KEY,
            "limit": 5,
            "language": "es"
        }
    }

    get paramsOpenWeather() {
        return {
            appid: process.env.OPEN_WEATHER_KEY,
            units: "metric",
            lang: "es"
        }
    }

    /**
     * @param city
     * @return {Promise<*[]>}
     */
    async city( city = ""){
        // http
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json`,
                params: this.paramsMapBox
            });

            const response = await instance.get();

            return response.data.features.map(place => ({
                id: place.id,
                name: place.place_name,
                lng: place.center[0],
                lat: place.center[1]
            }))
        } catch (err){
            return err;
        }
    }

    /**
     * @param lat
     * @param lon
     * @return {Promise<*[]|*>}
     */
    async weather( lat = "", lon = ""){
        // http
        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}`,
                params: this.paramsOpenWeather
            });

            const response = await instance.get();

            return {
                desc: response.data.weather[0].description,
                main: response.data.main
            };
        } catch (err){
            return err;
        }
    }

    /**
     * @param places
     * @param idSelectedPlace
     * @return {Promise<void>}
     */
    async print(places = [], idSelectedPlace = 0){
        const {name,lng,lat} = places.find( p => p.id === idSelectedPlace);
        const {desc, main} = await this.weather(lat,lng);

        console.log("\n City information \n".brightCyan);
        console.log("City:", name);
        console.log("Lat:", lat);
        console.log("Lng:", lng);
        console.log("Description:", desc);
        console.log("Temperature:", main.temp);
        console.log("Min:",  main.temp_min);
        console.log("Max:",  main.temp_max);
        console.log();
    }

    save(place = {}){
        let obj = true;

        if (this.history.length > 0){
            obj = this.history.find( h => h.id === place.id);
        }

        if(obj === undefined)
            this._history.push(place);
    }
}

module.exports = Search;