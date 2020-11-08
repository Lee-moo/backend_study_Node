function route(handle, pathname, response, postData){
    console.log("About to route a request for " + pathname);
    if(typeof handle[pathname] === 'function'){
        handle[pathname](response, postData);
    }else{
        console.log("No request handler found for "+ pathname);
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("404 Not Found");
        response.end();
    };
};

exports.route = route;


/*
"Routing"은 다른 URL을 다르게 처리하고 싶다는 말이다. /start 요청에 대한
"비즈니스 로직"은 /upload 요청과는 다른 함수에서 처리하고 싶다.
router는 요청에 대해 실제로 뭔가를 할 만한 곳이 아니다. 애플리케이션이 더 복잡
해지면 router를 확장하기가 쉽지가 안하진다.

요청이 route 될 함수를 request handler라고 부르기로 하고 곧바로 싲가해보다.

requestHanndler를 주입시키고 나면 여기서 우리가 해야 할 일은, 주어진 pahtname에
해당하는 request handler가 있는지 체크하고, 존재하면 그 함수를 호출하는 것이다.
연관배엘에서 요소에 접근하는 것처럼 객체에서 request handler 함수에 접근할 수
있으므로, "pathname handle 해줘~"로 읽히는 멋진 handle[pathname]();를
갖게 되었다 .
*/