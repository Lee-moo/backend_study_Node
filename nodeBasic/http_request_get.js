const http = require('http');
const url = require('url');

http.createServer((request,response)=>{
    const get = url.parse(request.url, true).query;

    if(request.method === 'GET') {
        response.writeHead(200, {'Content-Type' : 'text/html'});
        response.end(`<h1>${JSON.stringify(get)}</h1>`);
        console.log(`${request.method}방식의 요청입니다.`);
    }else if(request.method === 'POST') {
        console.log(`${request.method}방식의 요청입니다.`);
    }
}).listen(8888,()=>{
    console.log('서버가 동작 중입니다.');
});