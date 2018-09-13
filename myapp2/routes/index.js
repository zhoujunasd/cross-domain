var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/luyou',(req,res)=>{
  res.json({
    code:200,
    msg:"信息",
    data:"服务器代理"
  })
})

module.exports = router;
