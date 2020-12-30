const jwt = require('jsonwebtoken');
const RateLimit = require('express-rate-limit')

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send('로그인 필요');
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/');
  }
};
//This callback is called with decoded payload if the signature is vaild and optional expiration,
exports.verifyToken = (req, res, next) => {
  try {
    req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    return next();
  } catch (error) {
    //error에 대한 종류는 jwt 공식문서에 나와있다. 다양하게 사용해보자.
    if (error.name === 'TokenExpiredError') { // 유효기간 초과
      return res.status(419).json({
        code: 419,
        message: '토큰이 만료되었습니다',
      });
    }
    return res.status(401).json({
      code: 401,
      message: '유효하지 않은 토큰입니다',
    });
  }
};
//몇분간 몇번 썼는지 체크해주는 미들웨어다. 
exports.apiLimiter = new RateLimit({
  windowMs: 60 * 1000, // 1분
  max: 10,  // windowMs 시간 동안 최대 접근 가능 횟수
  delayMs: 0, //호출간격
  handler(req, res) {//제한을 어겼을 경우 handler 함수 호출된다. 
    res.status(this.statusCode).json({
      code: this.statusCode, // 기본값 429
      message: '1분에 열번만 요청할 수 있습니다.',
    });
  },
});

exports.deprecated = (req, res) => {
  res.status(410).json({
    code: 410,
    message: '새로운 버전이 나왔습니다. 새로운 버전을 사용하세요.',
  });
};



 //키 같은 거는 header.authorization에 넣는다. 키가 일치하면, 
  //req.decoded에 페이로드가 담긴다.