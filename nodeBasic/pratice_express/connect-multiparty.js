const express = require('express');
const fs = require('fs');
const multipart = require('connect-multiparty');

const app = express();

app.use(multipart({upload : `${__dirname}/upload`})); // 업로드 될 경로 지정

app.get('/', (request, response)=>{
    fs.readFile('connect-multiparty.html', (error, data)=>{
        response.send(data.toString());
    });
});

//파일 이름을 변경한 이유는 업로드된 파일을 적절히 관리하고 덮어쓰기 되는 것을 방지하기 위함이다.

app.post('/', (request, response)=>{
    const imgFile = request.files.image;
    const outputPath = `${__dirname}/upload/${Date.now()}_${imgFile.name}`;
    console.log(outputPath);
    console.log(request.body, request.files);
    fs.rename(imgFile.path, outputPath, ()=>{
        response.redirect('/');
    });
});

app.listen(3000, ()=>{
    console.log('server is running port 3000~');
});

/*
웹 브라우저에서 파일을 전송할 때 multipart/form-data 인코딩 방식을 사용한다.
body parser는 multipart/form-data를 지원하지 않기때문에 connect-multiparty를 
사용한다.
*/