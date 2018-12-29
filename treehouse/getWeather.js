const weather = require('./weather.js');

const location = process.argv.slice(2);
location.forEach(weather.get)