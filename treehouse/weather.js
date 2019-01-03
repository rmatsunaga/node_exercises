const https = require('https')
const api = require('./api.json')


function printMessage(temp, name) {
    const message = "Current temperature in " + name + " is " + temp + " degrees, Celsius.";
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
               //  console.log(body);
            });
            res.on('end', () => {
                // parse data
                const profile = JSON.parse(body);
                const temp = profile.main.temp;
                const name = profile.name;
                // print data
                printMessage(temp, name);   
            });
        } else {
            console.log("try something else");
        }
    });
}
module.exports.get = get;
