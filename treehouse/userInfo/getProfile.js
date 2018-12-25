// Problem: find user's badge count and javascript points in teamtreehouse.
// Solution: use Node.js to connect to Treehouse's API to get profile and print out info.
const profile = require('./profile.js');

const users = process.argv.slice(2);
users.forEach(profile.get);