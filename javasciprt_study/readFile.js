const fs = require('fs');

fs.readFile('./message.txt', (err,data)=>{
    if (err) throw err;
    console.log('async work01');
    console.log(data.toString());
});
//비동기로 readFile메소드를 실행 후 콜백함수에서 data에 대한 처리를 했다.
