const testFolder = './';
const fs = require('fs');

const filenameList = fs.readdirSync(testFolder);
//배열로 리턴해 준다.
console.log(filenameList);

filenameList.forEach((fileName)=>{
    console.log(fileName);
});