const fs = require('fs');
const http = require('http')

http.createServer((request,response)=>{
    fs.readFile('./136_example.html', (err,data)=>{
        if(err) {throw err;}
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.end(data);
    });
}).listen(8888, ()=>{
    console.log('서버가 동작 중입니다.');
});