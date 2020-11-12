const fs = require('fs');
const http = require('http');

http.createServer((request, response) =>{
    fs.readFile('./new.GIF', (err,data)=>{
        response.writeHead(200, {'Content-Type' : 'image/gif'});
        response.end(data);
    });
}).listen(8888, ()=>{
    console.log('서버가 동작 중입니다.');
});