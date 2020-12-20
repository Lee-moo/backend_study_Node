const fs = require('fs').promises;

fs.readFile('./readme.txt')
  .then((data) => {
    console.log(data);
    console.log(data.toString());
  })
  .catch((err) => {
    console.error(err);
  });

  //fs에서는 .promises로 더 쉽게 promise를 쓰게 해준다. 
  