const http  = require('http');

const parseCookies = (cookie ='') => 
    cookie
        .split(';') //쿠키들은 ;로 구분하므로 ;를 구분자로 하여 분리한다.
         .map(v => v.split('=')) // 헤더는 key = value 값이므로 분리한다.
         .map(([k, ...vs]) => [k, vs.join('=')]) 
        .reduce((acc, [k, v]) => {
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        }, {});

http.createServer((req, res) =>{
    console.log(typeof req.headers.cookie);
    const cookies = parseCookies(req.headers.cookie);
    console.log(req.url, cookies);
    res.writeHead(200, {'Set-Cookie' : 'mycookie=test'});
    res.end('Hello Cookie');
})
.listen(8080, ()=>{
    console.log('8082번 포트에서 서버 대기 중입니다.!');
});


