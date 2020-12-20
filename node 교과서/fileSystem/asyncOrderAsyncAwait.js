const fs = require('fs').promises;

console.log('start');

async function main(){
    let data = await fs.readFile('./readme.txt');
    console.log('1 ', data.toString());
    data = await fs.readFile('./readme.txt');
    console.log('2 ', data.toString());
    data = await fs.readFile('./readme.txt');
    console.log('3 ', data.toString());
}
main();