const https = require('https')
const http = require('http')
const api = require('./api.json')


function printMessage(temp, name) {
    const message = "Current temperature in " + name + " is " + temp + " degrees, Celsius.";
    console.log(message);
}
const printError = (error) => {
    console.error(error);
}

function get(query) {
    try {
        const readableQuery = query.replace('+', ' ');
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
                    if(profile.name) {
                        // print data
                        printMessage(profile.main.temp, profile.name); 
                    } else {
                        const queryError = new Error('The location for ' + readableQuery + 'was not found.');
                        printError(queryError);
                    }
                      
                });
            } else {
                const statusCodeError = new Error('There was an error getting the temperature for ' + readableQuery + '. ' + http.STATUS_CODES[res.statusCode]);
                printError(statusCodeError);
            }
        });
    } catch(error) {
        printError(error);
    }
    
}
module.exports.get = get;
