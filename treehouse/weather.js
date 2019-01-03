const https = require('https')
const api = require('./api.json')


function printMessage(location, temp) {
    const message = "Current temperature in " + location + " is " + temp + " degrees, Celsius.";
    console.log(message);
}

function get(query) {
    const request = https.get('https://api.openweathermap.org/data/2.5/weather?q='+ query + '&units=metric&APPID=' + api.key, 
    (res) => {
        if(res.statusCode === 200) {
            let body = ""
            // console.log('you\'re getting something');
            res.on('data', (data) => {
                body += data.toString();
            });
            res.on('end', () => {
                // parse data
                const profile = JSON.parse(body).main.temp;
                // print data
                printMessage(query, profile);   
            });
        } else {
            console.log("try something else");
        }
    });
}
module.exports.get = get;
