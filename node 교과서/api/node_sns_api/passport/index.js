const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id); //세션에 user의 id만 저장 
    }); //done하는 순간 auth.js에서 (loginError)를 실행 

    //req.user는 deserializeUser에서 생성 
    passport.deserializeUser((id, done) => {
        User.findOne({
          where: { id },
          include: [{
            model: User,
            attributes: ['id', 'nick'],
            as: 'Followers',
          }, {
            model: User,
            attributes: ['id', 'nick'],
            as: 'Followings',
          }],
        })
          .then(user => done(null, user))
          .catch(err => done(err));
      });
    
    local();
    kakao();
}
