const request = require('request');

request({
    url : 'https://www.google.com/',
    method : 'GET',
}, (error, response, body) => console.log(body));