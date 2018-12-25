// Problem: find user's badge count and javascript points in teamtreehouse.
// Solution: use Node.js to connect to Treehouse's API to get profile and print out info.

// require https module
const https = require('https');
// require http module for status codes
const http = require('http');


// Print error message

function printError(error) {
    console.error(error.message);
}

// print message to console
function printMessage(username, badgeCount, points) {
    const message = username + ' has ' + badgeCount + ' total badge(s) and ' + points + ' in Javascript.';
    console.log(message);
}

function getProfile(username) {
    // Error message
    try {
        // Connect to API URL (teamtreehouse.com/username.json)
        const request = https.get('https://teamtreehouse.com/' + username + '.json', (res) => {
            if(res.statusCode === 200) {
                // read data
                let body = ""
                res.on('data', (data) => {
                    body += data.toString();
                });
                res.on('end', () => {
                    try {
                        // parse data
                        const profile = JSON.parse(body);
                        // print data
                        printMessage(username, profile.badges.length, profile.points.JavaScript);   
                    } catch (error) {
                        printError(error);
                    }
                });
            } else {
                const message = 'There was an error getting the profile for ' + 'username (' + http.STATUS_CODES[res.statusCode] + ').';
                const statusCodeError = new Error(message);
                console.error(statusCodeError);
            }
        });
        request.on('error', (error) => {
             printError(error);
        }); 
    } catch(error) {
         printError(error);
    }
    
}

const users = process.argv.slice(2);
users.forEach(getProfile);