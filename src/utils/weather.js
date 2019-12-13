const request = require('request');

var long;
var lat;

const getLongLat = (place, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(place) +'.json?access_token=pk.eyJ1Ijoia2lyYW5rdW1hcjEyMzQiLCJhIjoiY2szNDhjdXF1MGh6cDNubGtzMGJybzVsOSJ9.QsjSVEaGkMMtVLZUPy2-zw&';
    request({url, json:true}, (err, res) => {
        callback(err, res);
    });    
};

const getWeatherForecast = (long, lat, callback) => {
    const url = 'https://api.darksky.net/forecast/d8f081f671c622963362862da6d1b539/'+lat+','+long+'?units=si';
    request({ url, json:true }, (error, response) => {
            callback(error, response);
    });
};

module.exports.getWeatherDetails = (address,callback) => {
    getLongLat(address, (error, { body } = {}) => {
        if(!error){
            if(body.features.length != 0){
                long = body.features[0].center[0];
                lat = body.features[0].center[1];
                place = body.features[0].place_name;
                getWeatherForecast(long, lat, (err, { body } = {}) => {
                    if(!err){
                        var currently = body.currently;
                        result ={
                            place,
                            message: body.timezone+". It is currently "+currently.temperature+" degrees out. There is a "+currently.precipProbability+"% chance of rain"
                        };
                        callback(null, result);
                    }else{
                        callback("Error occured while connecting to darksky", null);
                    }
                });
            }else{
                callback("Error occured while connecting to darksky", null);
            }
        }else{
            callback("Error occured while connecting to darksky", null);
        }
    });
};