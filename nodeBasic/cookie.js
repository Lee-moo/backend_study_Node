const http = require('http');

http.createServer((request,response)=>{
    response.writeHead(200,{'content-Type' : 'text/html',
'Set-Cookie' : ['soju = grilledPork', 'beer = chickken'],});

    response.end(`<h1>${request.headers.cookie}</h1>`);
}).listen(8888,()=>{
    console.log('서버가 동작 중입니다.');
});