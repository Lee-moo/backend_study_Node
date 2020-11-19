const express = require('express');
const parseurl = require('parseurl');
const session = require('express-session');

const app = express();

app.use(session({
    secret : 'keyboard dog',
    resave : false,
    saveUninitialized : true,
}));
/*
secret : 세션을 암호화 해준다.
resave : 세션을 항상 저장할 지 여부 결정 (false 권장)
saveuninitialized : 초기화되지 않은채 저장

*/
app.use((request, response, next)=>{
    if(!request.session.views) {
        request.session.views ={};
    }
    console.log(request.session);

    const pathname = parseurl(request).pathname;

    request.session.views[pathname] = (request.session.views[pathname] || 0) + 1;
    console.log(pathname);
    console.log(request.session.views[pathname])
    next();
});

app.get('/puddle', (request,response)=>{
    response.send(`Hello puddle! you viewd this page
     ${request.session.views['/puddle']} times`);

});

app.get('/biggle', (request, response)=>{
    response.send(`Hello biggle! you viewd this page
     ${request.session.views['/biggle']} times`);

});

app.listen(3000, ()=>{
    console.log('server is running port 3000');
});


// express-session 미들웨어는 request 객체에 session 속성을 활용할 수 있다.