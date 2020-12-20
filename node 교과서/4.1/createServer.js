const http = require('http');

const server = http.createServer((req, res)=>{
    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
    res.write('<h1>hello node</h1>');
    res.write('<p>hello server</p>');
    res.end('<p>end response</p>');
});

server.listen(8080);

server.on('listening', ()=>{
    console.log('8080 port');
});

server.on('error',()=>{
    console.error(error);
});