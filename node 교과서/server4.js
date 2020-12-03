const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

const parseCookies = (cookie ='') => 
    cookie
        .split(';') //쿠키들은 ;로 구분하므로 ;를 구분자로 하여 분리한다.
         .map(v => v.split('=')) // 헤더는 key = value 값이므로 분리한다.
         .map(([k, ...vs]) => [k, vs.join('=')]) 
        .reduce((acc, [k, v]) => {
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        }, {});

http.createServer((req,res)=>{
    const cookies = parseCookies(req.headers.cookie);

    if (req.url.startsWith('/login')) {
        const {query} = url.parse(req.url);
        const {name} = qs.parse(query);
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() +5 );
        res.writeHead(302, {
            Location : '/',
            'Set-Cookie' : `name=${encodeURIComponent(name)};Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
        });
        res.end();
    } else if (cookies.name){ 
        res.writeHead(200, {'Content-type' : 'text/html; charset=utf-8' });
        res.end(`${cookies.name}님 안녕하세요`);
    } else {
        fs.readFile('./server4.html', (err, data) => {
            if(err) throw err;
            res.end(data);
        });
    }
}).listen(8080, ()=>{
    console.log('port 8080 server on');
});