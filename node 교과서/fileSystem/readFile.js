const fs = require('fs');

fs.readFile('./readme.txt', (err,data)=>{
    if(err) {
        throw err;
    }
    console.log(data);
    console.log(data.toString());
});



// 콜백 형식이라서 node에서는 콜백이 대부분 err,data 순서라소
// util.promisify로 바꿔서 쓸 수 있다.