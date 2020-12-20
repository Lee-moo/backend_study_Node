const fs = require('fs');

const readStream = fs.createReadStream('./readme3.txt', {highWaterMark : 16});
const writeStream = fs.createWriteStream('./writeme3.txt');

readStream.pipe(writeStream);