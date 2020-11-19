const express = require('express');

const app = express();

app.get('/one', (request, response)=>{
    response.send('<a href="/two">Street 200</a>');
});

app.get('/two', (request, response)=>{
    response.send('<a href="/one">Street 100</a>');
});

app.get('/three/:number', (request, response)=>{
    const streetNumber = request.params.number;
    response.send(`${streetNumber}Steet`);
});;

app.get('/four/:number', (request, response)=>{
    const aveNumber = request.params.number;
    response.send(`${aveNumber}Ave`);
});

app.listen(3000,()=>{
    console.log('Server is running port 3000');
});

//':' 기호를 사용하여 매개변수를 전달할 수 있다. 