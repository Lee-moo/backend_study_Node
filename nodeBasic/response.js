require('http').createServer((request,response)=>{
    response.writeHead(200, {'Content-type' : 'text/html'});
    response.end('hello world!');
}).listen(8888, ()=>{
    console.log('서버가 동작 중입니다.');
});