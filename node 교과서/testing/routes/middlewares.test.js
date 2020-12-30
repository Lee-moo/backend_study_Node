const {isLoggedIn, isNotLoggedIn} = require('./middlewares');

describe('isLoggedIn', ()=>{
    //req, res는 객체라서 가짜 객체로 만들어 넣는다. 
    const res = {
        status : jest.fn(()=>res),
        send : jest.fn(),
    };
    const next = jest.fn(); //가짜 함수를 만드는 거다.

    test('로그인 되어있으면 isLoggedIn이 next를 호출해야 함', ()=>{
        const req = {
            isAuthenticated : jest.fn(()=> true),
        };
        isLoggedIn(req,res,next); //실제 req,res,next가 아니라 가짜로 넣어도 된다.
        //가짜여도 next만 실행되면 의도를 이룬거다. 
        expect(next).toBeCalledTimes(1);
    });

    test('로그인 되어있지 않으면 isLoggedIn이 에러를 응답해야 함', () => {
        const req = {
          isAuthenticated: jest.fn(() => false),
        };
        isLoggedIn(req, res, next);
        expect(res.status).toBeCalledWith(403);
        expect(res.send).toBeCalledWith('로그인 필요');
      });
});


describe('isNotLoggedIn', () => {
    const res = {
      redirect: jest.fn(),
    };
    const next = jest.fn();
  
    test('로그인 되어있으면 isNotLoggedIn이 에러를 응답해야 함', () => {
      const req = {
        isAuthenticated: jest.fn(() => true),
      };
      isNotLoggedIn(req, res, next);
      const message = encodeURIComponent('로그인한 상태입니다.');
      expect(res.redirect).toBeCalledWith(`/?error=${message}`);
    });
  
    test('로그인 되어있지 않으면 isNotLoggedIn이 next를 호출해야 함', () => {
      const req = {
        isAuthenticated: jest.fn(() => false),
      };
      isNotLoggedIn(req, res, next);
      expect(next).toHaveBeenCalledTimes(1);
    });
  });

  
//  isLoggedIn은 req.isAuthenticatedd를 사용하니까 해당 프로퍼티도 만들어 준다.
//   exports.isLoggedIn = (req, res, next) => {
//     if (req.isAuthenticated()) {
//         next();
//     } else {
//         res.status(403).send('로그인 필요');
//     }
// };

