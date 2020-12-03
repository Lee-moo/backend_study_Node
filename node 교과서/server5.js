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
        //cookie.session이 있고 만료 기한을 넘기지 않았다면 session 변수에서 사용자 정보를 가져와서
        //사용한다. 
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

/*
쿠키는 클라이언트에 key=value의 형식으로 저장하고 세션은 서버에 저장한다. 쿠키에 보안에 위협이 되는
데이터를 저장하면 보안 문제가 발생할 수 있기 때문에 세션에 사용자 정보를 저장하고 쿠키에는 세션에
randomInt같은 값을 전달해준다.

물론 실제 배포용 서버에서는 세션을 위와 같이 변수에 저장하지 않는다. 서버가 멈추거나 재시작되면 메모리에
저장된 변수가 초기화되기 때문이다. 또한, 서버의 메모리가 부족하면 세션을 저장하지 못하는 문제도 생긴다.
그래서 보통은 데이터베이스에 넣어둔다. 

REST란, "웹에 존재하는 모든 자원(이미지, 동영상, DB 자원)에 고유한 URI를 부여해 활용"
*/