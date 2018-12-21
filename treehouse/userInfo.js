// Problem: find user's badge count and javascript points in teamtreehouse.
// Solution: use Node.js to connect to Treehouse's API to get profile and print out info.

// require https module
const https = require('https');

// print message to console
function printMessage(username, badgeCount, points) {
    const message = username + ' has ' + badgeCount + ' total badge(s) and ' + points + ' in Javascript.';
    console.log(message);
}

function getProfile(username) {
    // Connect to API URL (teamtreehouse.com/username.json)
    const request = https.get('https://teamtreehouse.com/' + username + '.json', (res) => {
        console.log(res.statusCode);
        // read data
        let body = ""
        res.on('data', (data) => {
            body += data.toString();
        });
        res.on('end', () => {
            // parse data
            const profile = JSON.parse(body);
            // print data
            printMessage(username, profile.badges.length, profile.points.JavaScript);
        });
    });
}

const users = process.argv.slice(2);
users.forEach(getProfile);