const http = require('http');

http.createServer((request,response)=>{
    if(request.headers.cookie) {
        const cookie = request.headers.cookie.split(';').map((element)=>{
            element = element.split('=');
            return {
                name : element[0],
                name : element[1],
            };
        });
        response.end(`<h1>${JSON.stringify(cookie)}</h1>`);
    }else{
        response.writeHead(200, {'Content-Type' : 'text/html',
            'Set-Cookie' : ['soju = grilledpork', 'beer = chichken']
        });
        response.end(`<h1>${'쿠기 생성함'}</h1>`);
    }
}).listen(8888, ()=>{
    console.log('서버 작동 중');
});