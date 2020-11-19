const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended : false}));
// extended 옵션의 경우 true일 경우, 객체 형태로 전달된 데이터내에서 또 다른 
//중첩된 객체를 허용한다는 말이며, false인 경우에는 허용하지 않는다는 의미이다.
app.use(bodyParser.json());

app.use(express.static(`${__dirname}/login`));

app.use((request,response)=>{
    const userId = request.body.userid || request.query.userid;
    const userPassword = request.body.password || request.query.password;

    //get방식(query), post 방식(body)를 구분하여 변수에 값을 대입한다.
    console.log (request.body.userId + ", " + request.body.userPassword);
    console.log(request.query.userId + ", " + request.query.userPassword);

    response.writeHead('200', {'Content-type' : 'text/html;charset=utf-8'});
    response.write('<h1>Login Id와 pw 결과 값 입니다.</h1>');
    response.write(`<div><p>${userId}</p></div>`);
    response.write(`<div><p>${userPassword}</p></div>`);
    response.end(JSON.stringify(request.body, null, 2));
});

app.listen(3000, ()=>{
    console.log('Server is running port 3000!');
});

/*
body-parser 미들웨어를 통해 post 요청을 처리할 때 사용자가 보낸 데이터를 추출할 수 있다.
또한 request 객체에 body 속성이 부여한다.

body-parser 미들웨어의 여러 옵션 중에 하나로 false값일 시 node.js에 기본으로
내장된 queryString, true 값일 시 따로 설치가 필요한 npm qs 라이브러를 사용한다.
둘 다 url 쿼리 스트링을 파싱해주지만, qs가 추가적인 보안이 가능하다.
*/