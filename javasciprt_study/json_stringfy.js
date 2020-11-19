const fs = require('fs');

const userList = [
    {name : 'kyeongrok', age : 31},
    {name : 'jihyun', age : 31},
];

fs.writeFile('./list.json', JSON.stringify(userList), (err) =>{
    if(err) throw err;
});

