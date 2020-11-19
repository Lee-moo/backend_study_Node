const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('combined'));
app.use(morgan('common'));
app.use(morgan(':method + :date'));
app.use(morgan(':status + :url'));
app.use((request, response) =>{
    response.send('express morgan');
}).listen(3000, ()=>{
    console.log('Server is running port 3000!');
});

/*
morgan 미들웨어를 통해 웹 요청이 들어왔을 때 로깅을 할 수 있따.
morgan 메소드의 매개 변수로 combined, common이 가장 기본적으로 쓰이고
tokne들을 좋바해서 원하는 형식으로 로그를 출력하게 할 수 있다.

*/