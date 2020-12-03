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

const session = {};

http.createServer((req,res)=>{
    const cookies = parseCookies(req.headers.cookie);

    if (req.url.startsWith('/login')) {
        const {query} = url.parse(req.url);
        const {name} = qs.parse(query);
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() +5 );
        const randomInt=  +new Date(); //숫자 객체를 +연산자를 이용해
        // 숫자로 변환한다. 
        session[randomInt] = {
            name,
            expires,
        };
//세션에 사용자의 이름과, 만료 기한을 저장한다. 
//쿠키에 이름을 보내는 대신 , randomInt라는 임의의 숫자를 보냈다. 
        res.writeHead(302, {
            Location : '/',
            'Set-Cookie' : `session=${randonInt};Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
        });
        res.end();
    } else if (cookies.session && session[cookie.session].expires > new Date()){ 
        res.writeHead(200, {'Content-type' : 'text/html; charset=utf-8' });
        res.end(`${session[cookies.session].name}님 안녕하세요`);
    } else {
        fs.readFile('./server4.html', (err, data) => {
            if(err) throw err;
            res.end(data);
        });
    }
}).listen(8080, ()=>{
    console.log('port 8080 server on');
});