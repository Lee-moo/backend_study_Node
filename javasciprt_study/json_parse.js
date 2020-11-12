const fs = require('fs');

fs.readFile('./list.json', (err,data)=>{
    if(err) throw err;
    const json = JSON.parse(data.toString());
    console.log('name', json[0].name);
    console.log('name', json[1].name);   
});