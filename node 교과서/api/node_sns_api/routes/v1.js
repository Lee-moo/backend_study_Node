const express = require('express');
const jwt = require('jsonwebtoken');

const { verifyToken, deprecated } = require('./middlewares');
const { Domain, User, Post, Hashtag } = require('../models');

const router = express.Router();

router.use(deprecated);

router.post('/token', async (req, res) => {
  const { clientSecret } = req.body;
  console.log(req.body); //
  try {
    const domain = await Domain.findOne({
      where: { clientSecret },
      include: {
        model: User,
        attribute: ['nick', 'id'],
      },
    });
    if (!domain) {
      return res.status(401).json({
        code: 401,
        message: '등록되지 않은 도메인입니다. 먼저 도메인을 등록하세요',
      });
    }
    const token = jwt.sign({
      id: domain.User.id,
      nick: domain.User.nick,
    }, process.env.JWT_SECRET, {
      expiresIn: '1m', // 1분
      issuer: 'nodebird',
    });

    console.log(token);

    return res.json({
      code: 200,
      message: '토큰이 발급되었습니다',
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: '서버 에러',
    });
  }
});

router.get('/test', verifyToken, (req, res) => {
  res.json(req.decoded);
});

router.get('/posts/my', verifyToken, (req,res)=>{
  Post.findAll({ where : {userId : req.decoded.id}})
    .then((posts) =>{
      console.log(posts);
      res.json({ //code랑 규격에 형식은 자윤데 서비스 전체에 대해서는 일관성 있게 만들자.
        code : 200,
        payload : posts,
      });
    })
    .catch((err)=>{
      console.error(err);
      return res.status(500).json({
        code : 500,
        message : '서버 에러',
      });
    });
});

router.get('/posts/hashtag/:title', verifyToken, async (req, res) => {
  try {
    const hashtag = await Hashtag.findOne({ where: { title: decodeURIComponent(req.params.title) } });
    if (!hashtag) {
      return res.status(404).json({
        code: 404, //검색은 성공했기에 빈데이터 보내주고 204을 보내주는 경우도 있다. 
        //코드를 붙여주는 이유는 프론트에서 코드만 보고도 어떤 에러인지 알 수 있게 하기 위해서다.
        message: '검색 결과가 없습니다',
      });
    }
    const posts = await hashtag.getPosts();
    return res.json({
      code: 200,
      payload: posts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: '서버 에러',
    });
  }
});

module.exports = router;
