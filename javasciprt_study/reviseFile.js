const fs = require('fs');

fs.readFile('./message.txt', (err,data)=>{
    if(err) throw data;
    
    contents = data.toString();
    contents = 'replaced'
    fs.writeFile('./message.txt', contents, (err)=>{if(err) throw err;});

});