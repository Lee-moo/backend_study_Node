//이렇게 우리 서버 모듈을 내장 모듈과 똑같이 사용할 수 있다.
// 파일을 require하고, 지역변수에 할당하면 export된 함수를 쓸 수 있다. 
var server = require('./server');
var router = require('./router');
var requestHandler = require('./requestHandler');

var handle ={};
handle["/"] = requestHandler.start;
handle["/start"] = requestHandler.start;
handle["/upload"] = requestHandler.upload;
//handle은 사물에 가까지만 동사처럼 이름을 지엇다. 결과적으로 router의 멋진 표현이 될 것이다.
//객체를 정의한 후에 server에게 별도의 파라미터로 전달한다. 

server.start(router.route, handle);
//여기서 router함수를 server로 inejct한다.


/*
다른 http 요청이 코드의 다른 부분을 가리키도록 하는 것을 라우팅이라고
한다. 
*/