const express = require('express');
const request = require('request');

const app = express();

app.use((request, response,next)=>{
    console.log('첫번째 미들웨어 요청');
    request.user1 = 'lee';
    next();
});
console.log(1);
app.use((reuqest, response, next)=>{
    console.log('두번째 미들웨어 요청');
    request.user2 = 'kim';
    next();
});
console.log(2);
app.use((request,response, next)=>{
    console.log('세번째 미들웨어 요청');
    response.writeHead('200', {'Content-Type' : 'text/html;charset=utf8'});
    response.write(`<div><p>${request.user1}</p></div>`);
    response.write(`<div><p>${request.user2}</p></div>`);
    response.end('<h1>express 서버에서 응답한 결과 </h1>');

});
console.log(3);
app.listen(3000, ()=>{
    console.log('Server is running port 3000!');
});

/*
express 모듈을 통해 request와 response 과정 중에 다른 로직을 실행할 수 있도록
분리된 함수를 '미들웨어'라고 한다. use() 미들웨어 함수를 사용해서 요청에 따른
처리를 할 수 있다. http 모듈과 달리 use() 함수를 사용해서 이벤트 리스너를 
연결한다.

doc를 보면 Middlewar functions are functions that hace access to the request obejct,
the response object, and the next function in the application's request-response cycle/

미들웨어란 간단하게 말하면 요청과 응답 사이에 목적에 맞게 처리를 하는, 말하자면 
거쳐가는 함수들이라고 보면 된다.

다음 미들웨어 함수에 대한 access는 next() 함수를 이용해서 다음 미들웨어로
현재 요청을 넘길 수 있다.
next를 통해 순차적으로 처리되기 때문에 순서가 중요하다.
*/