//code converts lat/long to weather

const request = require("postman-request");
const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=f83d31a85f65ae7450e31b716a5676e3&query='+ latitude+ ','+ longitude +'&units=f';

    request({ url: url, json: true }, (error, response) => {
    if(error){
        callback('Unable to connect to the services');
    }
    else if(response.body.error){
        callback('Unable to find location. Enter correct address');
    }

    else{
       callback(undefined,({
        temperature: response.body.current.temperature,
        prediction: response.body.current.weather_descriptions[0]
       }));
    }
    })
}

module.exports= forecast;
