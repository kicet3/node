const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const { User } = require("./models/User.js");

const config = require('./config/key')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const mongoose =require('mongoose')
mongoose.connect(config.mongoURI,{
    useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false
}).then(()=>console.log('MongoDB Connected...'))
  .catch(err =>console.log(err))

app.get('/',(req,res)=>res.send('Hello World!! 안녕하세요 ~~'))

app.post('/register',(req,res)=>{
  //회원 가입 시 필요한 정보 client에서 가져오고 데이터 베이스에 저장한다.
  const user = new User(req.body)

  user.save((err, userInfo)=>{
    if(err) return res.json({success:false, err})
    return res.status(200).json({
      success:true
    })
  })
})

app.get('api/hello',(req,res)=>{
    res.send("안녕하세요 ~ ")
})

app.listen(port,() => console.log('Example app listening on port ${port}!'))