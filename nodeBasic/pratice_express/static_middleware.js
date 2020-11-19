const express = require('express');

const app = express();

app.use(express.static(`${__dirname}/multimedia`));
app.use((request, response)=>{
    response.writeHead('200', {'Content-Type' : 'text/html;charset=utf8'});
    response.end('<img src="/new.gif" width="100%"/>');

});

app.listen(3000, ()=>{
    console.log('Server is running port 3000');
});
/*
static 미들웨어를 활용하여 손쉽게 이미지 파일, Javascript 파일, CSS 파일을
처리할 수 있다.
__dirname을 통해 파일을 설정하고, 이미지 파일을 multimedia 폴더에 복사한다. 

이렇게 자체적으로 정적 파일 라우터 기능을 수행하므로 최대한 위쪽에 배치하는 것이 좋다.
그래야 서버가 쓸데없는 미들웨어 작업을 하는 것을 막을 수 있다.
보통 morgan 다음에 배치한다.
static 미들웨어를 morgan보다 더 위로 올리면 정적 파일 요청이 기록되지 않기 때문이다.

*/