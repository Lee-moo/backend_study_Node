const fs = require('fs');

fs.writeFile('./writeme.txt', 'writing ', (err)=>{
    if(err) {
        throw err;
    }
    fs.readFile('./writeme.txt', (err,data)=>{
        if(err) {
            throw err;
        }
        console.log(data.toString());
    });
});