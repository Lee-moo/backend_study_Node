const express = require('express');
const path = require('path');
const app = express();

app.set('port', process.env.PORT || 3000); //서버에 port라는 속성을 심는 거다. 
//전역변수 같은 느낌이다. 

app.use((req,res, next) =>{
    console.log('모든 요청');
    next();
});
app.use('./about', (req,res,next)=>{
    console.log('/about middleware');
    next();
})

app.use((req,res,next)=>{
    console.log('1. 모든 요청에 실행');
    next();
}, (req,res,next)=>{
    console.log('2. 모든 요청에 실행');
    next();
}, (req,res,next)=>{
    console.log('3. 모든 요청에 실행');
   // throw new Error('error'); express 기본 제공 에러 처리 
   next();
});


app.get('/', (req,res)=>{
    //res.setHeader('Content-Type','text/html');
    // res.sendFile(path.join(__dirname, 'index.html'));
    //ststus(200) 생략

    res.json({hello : 'lee'});
    console.log('hello lee');
    //console이 실행되는데 res.json이 return이 아니라
    //그냥 응답을 하는 거다.
});

app.post('/', (req,res)=>{
    res.send('hello express!');
});

app.get('/about', (req,res)=>{
    res.send('hello express');
});

app.use((req,res,next)=>{
    res.status(404).send('404');
});

app.use((err,req,res,next)=>{
    console.error(err);
    res.send('error');
});

app.listen(app.get('port'), ()=>{
    console.log('start express server on port 3000');
});



// //라우터 와일드카드 
// app.get('/category/:name', (req,res)=>{
//     res.end(`${req.params.name} !! `);
// });

// //모든 get 요청을 처리 
// // app.get('*', (req,res)=>{
// //     res.end('response all request')
// // });

// // app.get('/category/javascript', (req,res)=>{
// //     res.send(`hello javascript !! `);
// // });

