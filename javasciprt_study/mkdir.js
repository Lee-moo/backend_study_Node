const fs = require('fs');

const dirName = `${__dirname}/img`;
if(!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName);
}