const express = require('express');
const { ConsoleTransportOptions } = require('winston/lib/winston/transports');

const app = express();

app.use((request, response)=>{
    const agent = request.header('User-agent');
    const paramName = request.query.name;
    const browserChrome = 'Hello Chrome';
    const browserOthers = 'Hello Others';

    console.log(request.header);
    console.log(request.baseUrl);
    console.log(request.hostname);
    console.log(request.protocol);

    if(agent.toLowerCase().match(/chrome/)){
        response.write(`<div><p>${browserChrome}</p></div>`);
    }else {
        response.write(`<div><p>${browserOthers}</p></div>`);
    }
    response.write(`<div><p>${agent}</p></div>`);
    response.write(`<div><p>${paramName}</p></div>`);
    response.end();
});

app.listen(3000, ()=>{
    console.log('Server is running port 3000~');
});