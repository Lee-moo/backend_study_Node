const fs = require('fs');
const list = [1,2,3,4,5];
list.forEach(item => fs.appendFile(
    './chapter.txt', `chapter ${item}\n`, (err)=> {if(err) throw err;}
));

// 비동기이기 때문에 순서는 다를 수 있다. 