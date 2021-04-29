const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { User } = require("./models/User");

const config = require('./config/key');


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());

app.use(cookieParser());


const mongoose =require('mongoose');
const cookieParser = require('cookie-parser');
mongoose.connect(config.mongoURI,{
    useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false
}).then(()=>console.log('MongoDB Connected...'))
  .catch(err =>console.log(err))

app.get('/',(req,res)=>res.send('Hello World!! 안녕하세요 ~~'))

app.post('/register',(req, res)=>{
  //회원 가입 시 필요한 정보 client에서 가져오고 데이터 베이스에 저장한다.
  const user = new User(req.body)

  user.save((err, userInfo)=>{
    if(err) return res.json({success:false, err})
    return res.status(200).json({
      success:true
    })
  })
})
/*
app.post('/login',(req,res)=>{
  //요청한 이메일 데이터 베이스에서 찾기
  User.findOne({ email:req.body.email },(err,userInfo)=>{
    if(!userInfo){
      return res.json({
        loginSuccess:false,
        message:"제공된 이메일에 해당하는 유저가 없습니다."
      })
    }
    //요청한 이메일과 비밀번호가 맞는지 확인
    user.comparePassword(req.body.password,(err,isMatch)=>{
      if(!isMatch)
      return res.json({loginSuccess:false,message:"비밀번호가 틀렸습니다."})
    //비밀번호 까지 맞다면 Token 생성
      user.generateToken((err,user)=>{
        if(err) return res.status(400).send(err);
        res.cookie("x_auth",user.token)
        .status(200)
        .json({loginSuccess:true,userId:user._id})
      })
    })
  })
})
*/
app.get('api/hello',(req,res)=> res.send("안녕하세요 ~ "))

app.listen(port,() => console.log('Example app listening on port ${port}!'))