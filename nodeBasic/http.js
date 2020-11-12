const http = require('http');

const server = http.createServer(); 
// createServer method returns object and this have two method 
// listen(), close()

server.listen(50000, ()=>{
    console.log('서버가 동작 중입니다.');
});

//웹서버 종료
const testClose = function(){
    server.close();
    console.log('서버가 종료되었습니다.');
};

setTimeout(testClose, 5000);
