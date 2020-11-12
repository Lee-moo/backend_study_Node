const fs = require('fs');

const data = fs.readFileSync('./message.txt');
console.log(data);
const string = data.toString();
console.log('sync work01');
console.log(string);
