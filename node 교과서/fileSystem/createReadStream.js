const fs = require('fs');

const readStream = fs.createReadStream('./readme3.txt', {highWaterMark:16});
// 스트림의 방식을 보기 위해서 highWaterMark를 16b로 했는데
// 스트림은 기본 64kb씩 읽어 온다. 
const data = [];
readStream.on('data', (chunk)=>{
    data.push(chunk);
    console.log('data :', chunk, chunk.length);

});

readStream.on('end', ()=>{
    console.log('end : ', Buffer.concat(data).toString());

});


readStream.on('error',(err)=>{
    console.log('error : ', err);
});