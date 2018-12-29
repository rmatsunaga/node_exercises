const https = require('https')

function printMessage(location, temp) {
    const message = "Current temperature in " + location + " is " + temp + " degrees, Celsius.";
    console.log(message);
}

function get(location) {
    const request = https.get('https://api.openweathermap.org/data/2.5/weather?q='+ location + '&units=metric&APPID=ad7507de962e3eec8ba2bc524b91b064', (res) => {
        if(res.statusCode === 200) {
            let body = ""
            res.on('data', (data) => {
                body += data.toString();
            });
            res.on('end', () => {
                // parse data
                const profile = JSON.parse(body);
                // print data
                printMessage(location, profile.main.temp);   
            });
        } else {
            console.log("try something else");
        }
    });
}
module.exports.get = get;
