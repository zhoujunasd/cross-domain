var express = require('express');
var router = express.Router();

const users = [{
    username: "zj",
    password: "123"
  },
  {
    username: "zz",
    password: "321"
  }
]


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

router.post('/login', (req, res) => {
  const {
    username,
    password
  } = req.body
  let loginSuccess = false
  users.forEach(item => {
    if (item.username === username 
      && item.password === password) {
      loginSuccess = true
    }
    if(loginSuccess){
      res.json({
        code:200,
        msg:"登录成功"
      })
    }
  });
})

// router.get('/',(req,res) = >{}) 顺序必须是req，res 
router.get('/json',(req,res)=>{
  res.json({
    data: 'json方式',
    code: 200
  })
})

router.get('/jsonp',(req,res)=>{
  res.jsonp({
    data:"jsonp方式",
    msg:"一些信息",
    code:200
  })
})

// 使用框架,使用的框架代码应放在需要调用的路由的上面
let cors = require('cors')
// // 对于简单请求，直接使用router.use(cors())即可
// router.use(cors())
// 复杂请求
const corsOptions ={
  origin: 'http://localhost:8080',
  credentials:true
}
router.use(cors(corsOptions))

// 对于简单请求，加上一个请求头，对应所需跨域的端口，对应所有的端口使用“*
router.get('/cors',(req,res)=>{
  // res.header('Access-Control-Allow-Origin','http://localhost:8080')
  // res.header('Access-Control-Allow-Oringin','*')
  res.json({
    data:"cors方式",
    msg:"一些信息",
    code:200
  })
})

// // 对于所有的请求的跨域问题，直接在router的前面加上一个，如下所示代码
// router.all('*',(req,res,next)=>{
//   res.header('Access-Control-Allow-Origin','*')
//   res.header('Access-Control-Allow-Headers','content-type')
//   res.header('Access-Control-Allow-Method','POST,GET,DELETE,OPTIONS')
//   // 允许客户端携带cookie到服务端,在客户端设置：withCredentials: true
//   res.header('Access-Control-Allow-Credentials',true)
//   next()
// })

//对于非简单请求，需要加上router.options
// router.options('/corsdif',(req,res)=>{
//   res.header('Access-Control-Allow-Origin','*')
//   res.header('Access-Control-Allow-Headers','content-type')
//   res.header('Access-Control-Allow-Method','POST,GET,DELETE,OPTIONS')
//   res.send()
// })

router.post('/corsdif',(req,res)=>{
  // res.header('Access-Control-Allow-Origin','*')
  res.json({
    data:"cors的非简单请求方式",
    msg:'信息',
    code:200
  })
})

// 使用服务器代理跨域，服务器之间访问不是跨域
let http = require('http')
router.get('/proxy',(req,res)=>{
  http.get('http://localhost:3030/luyou',(response)=>{
    let rawData = ''
    response.on('data',(chunk)=>{rawData+=chunk})
    response.on('end',()=>{
      try{
        const parsedData  =JSON.parse(rawData)
        console.log(parsedData)
      }catch(e){
        console.error(e.message)
      }
    })
  })
})

// 使用插件http-proxy-middleware
var proxy = require('http-proxy-middleware')
router.use('/api', proxy({
  target: 'http://localhost:3030', 
  changeOrigin: true,
  pathRewrite:{
    '/api':'/'
  }
}));


module.exports = router;