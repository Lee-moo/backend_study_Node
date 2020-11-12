const fs = require('fs');

const contents = 'hello\nbye';
fs.writeFile('./message.txt', contents, (err) =>{
    if(err) throw err;
    
});