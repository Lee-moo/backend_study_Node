const exec = require('child_process').exec;

var process = exec('dir');

process.stdout.on('data', function(data){
    console.log(data.toString());
});

process.stderr.on('data', function(data) {
    console.error(data.toString());
  }); // 실행 에러
  

  //child process는 다른 프로세스를 하나 더 띄운다.
  