const fs = require('fs');

const renamefile = (fromFilePathName, toFilePathName) =>{
    fs.rename(fromFilePathName, toFilePathName, (err)=>{
        if(err) console.log(`ERROR : ${err}`);
    });

};

const fromFilePathName = './hello.txt';
const toFilePathName = './bye.txt';

renamefile(fromFilePathName, toFilePathName);

