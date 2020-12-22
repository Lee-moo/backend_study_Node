const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev')); // 요청과 응답을 기록해주는 미들웨어// 개발 시 dev 배포 시 combined
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json); 
app.use(express.urlencoded({extended : true}));//true면 qs, false면 querystring
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave : false,
    saveUninitialized : false,
    secret : process.env.COOKIE_SECRET,
    cookie : {
        httpOnly : true,

    },
    name : 'connect-sid', // ?? 서명되서 읽을 수 없는 문자열로 바뀐다.
}));

const multer = require('multer');
const fs = require('fs');

try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads/'); //null자리는 에러 처리 미들웨어를 위해서 사용  
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});
app.get('/upload', (req, res) => {
  res.sendFile(path.join(__dirname, 'multipart.html'));
});
app.post('/upload', upload.single('image'), (req, res) => {
  console.log(req.file);
  res.send('ok');
});




//미들웨어간 데이터 전송 
app.use('/',(req,res,next)=>{
    req.data = 'lee';
    //req.session.data = 'lee'; //유지하고 싶은 데이터 
})

app.get('/', (req,res, next)=>{
    req.data
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use((req,res,next)=>{
    res.status(404).send('404');
});

app.use((err,req,res,next)=>{
    console.error(err);
    res.send('error');
});

app.listen(app.get('port'), ()=>{
    console.log('start express server on port 3000');
});






// req.cookies;
// //req.signedCookies;
// res.cookie('name', encodeURIComponent(name), {
//     expires : new Date(),
//     httpOnly : true,
//     path : '/',
// })
// res.clearCookie('name', encodeURIComponent(name), {
//     httpOnly : true,
//     path : '/',
// })


//미들웨어 확장
// app.use('/', (req,res,next)=>{
//     if(req.session.id) {
//         express.static(path.join(__dirname, 'public'))(req,res,next);
//     }else {
//         next();
//     }
// });