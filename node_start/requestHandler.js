
var querystring = require("querystring");

function start(response, postData) {
    console.log("Request handler 'start' was called.");
  
    var body = '<html>'+
      '<head>'+
      '<meta http-equiv="Content-Type" content="text/html; '+
      'charset=UTF-8" />'+
      '</head>'+
      '<body>'+
      '<form action="/upload" method="post">'+
      '<textarea name="text" rows="20" cols="60"></textarea>'+
      '<input type="submit" value="Submit text" />'+
      '</form>'+
      '</body>'+
      '</html>';
  
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(body);
      response.end();
}
  
function upload(response, postData) {
    console.log("Request handler 'upload' was called.");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("You've sent the text: "+
    querystring.parse(postData).text);
    response.end();

}
exports.start = start;
exports.upload = upload;
/*
이 requesthandler 모듈을 작성한 시점에서 결정이 필요하다. 이 모듈을 reouter에
하드코딩 된 방식으로 묶을 것이냐, 아니면 의존관계 주입으로 좀 더 처리할 것이냐?
모든 패턴과 마찬가지로 의존 관계 주입은 그 자체를 위해 사용하는 것이 아니다
여기에선느 router와 requestHandler를 느슨하게 묶어서 router의 재사용성을
크게 높인다. 
*/