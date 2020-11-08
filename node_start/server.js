// var http = require("http");

// http.createServer(function(request, response) {
//   response.writeHead(200, {"Content-Type": "text/plain"});
//   response.write("Hello World");
//   response.end();
// }).listen(8888);

var http = require('http');
var url = require('url');
function start(route, handle){
    function onRequest(request, response){
      var postData = "";
      var pathname = url.parse(request.url).pathname;
      console.log("Request for " + pathname + " received.");

      request.setEncoding("utf-8");

      request.addListener("data", function(postDataChunk) {
        postData += postDataChunk;
        console.log("Received POST data chunk '" + postDataChunk + "'.");
      });

      request.addListener("end", function(){
        route(handle, pathname, response, postData);
      });
        
    };
    http.createServer(onRequest).listen(8888);
    console.log("Server has started");
}
exports.start = start;

//프로젝트를 어떻게 구조화 하는 지에 대한 것은 뒤에서 다시 다룬다.
/*
node.js에 기본으로 포함된 http 모듈을 읽어 들인 다음, http라는 이름의 변수를 통해
접근할 수 있게 만들엇다.

http모듈에서 제공하는 함수 중 하나인 createServer를 호출한다. 해당 함수는
객체를 리턴하고, 그 리턴된 객체는 listen이라는 이름의 함수를 가지고 있다.
listen 함수는 http서버에서 요청대기할 포트 번호를 나타내는 숫자를 받느낟.

*/

/*
자바스크립트에서는 우리는 함수를 다른 함수의 파라미터로 넘길 수 있다.
이것을 함수를 변수에 할당한 후에 넘길 수도 있고, 정의하는 동시에 넘길 수도 있다.

Event-driven callbacks
Node.js가 굉장히 빠른 이유가 바로 이벤트 드리븐 때문입니다.
이것은 모두 결국 Node.js가 이벤트 드리븐으로 동작한다는 사실로 귀결됩니다.

http.createServer 메소드를 호출할 때, 우리는 서버가 특정 포트를 listen 할 뿐
아니라 HTTP 요청이 올 때 뭔가를 하기를 기대한다.
문제는 HTTP 요청이 비동기적으로 일어난다는 것이다.
http 요청은 언제든지 일어날 수 있지만, 우리에게는 하나의 프로세스밖에 없다.

서버를 생성할 때 서버 생성 메소드의 파라미터로 함수를 넘긴다. 요청이 올 때마다
파라미터로 넘긴 함수가 호출된다.

청이 언제 발생할 지는 모르지만 이제 들어오는 요청을 처리할 곳 생겼습니다
 파라미터로 넘긴 함수입니다.
 함수를 먼저 정의한 후 넘겼든 anonymous function으로 넘겼든 말이죠.
 이 개념을 callback 이라고 합니다. 우리는 메소드에 함수를 넘기고, 
 메소드는 관련된 이벤트가 발생하면 이 함수를 거꾸로 호출(call back) 합니다.

request, response 이것들 ㅇ객체이다. http 요청을 자세히 핸들링하거나
응답을 보내는데에 이 객체들의 메소드를 사용할 수 있다. 

*/

/*
---------- 라우터 과정 -------------
var pathname = url.parse(request.url).pathname; 
이제 url path를 기준으로 요청을 구분할 수 있게 되었다. 이걸 이용하면 
URL path를 기반으로 요청을 request handler로 매핑하는 router를 만들 수 있겟다.


*/