var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModule = require('../modules/index');

const SECRET = 'abcdefg';

/* login */
router.post('/', async (req, res, next) => {
    console.log('req---->', req.body);
    const user = await userModule.selectUser({
        username: req.body.username,
        password: req.body.password,
    }, (error, result) => {
        if(error) {
            throw error;
        }
        let data = JSON.parse(JSON.stringify(result));
        if (data[0]) {
            if(data[0].name == req.body.username && data[0].password == req.body.password) {
                console.log('1111')
                return res.status(200).send({
                    message: '登录成功！'
                })
            }
            
        } else {
            return res.status(422).send({
                message: '登录用户名不存在',
            })
        }
    })

   

    const isPasswordValid = bcrypt.compareSync(
            req.body.password,
            user.password,
        );
    console.log(isPasswordValid); 

    if (!isPasswordValid) {
        return res.status(422).send({
            message: '密码无效',
        })
    }
    
    // 生成token
    const token = jwt.sign({
        id: String(user._id),

    }, SECRET);

    res.send({
        status: 200,
        data: {
            user: user,
            token: token,
        }
    })
}) 


/* register */
router.post('/register', async (req, res, next) => {
    console.log('register user', req.body);  
    try {
        const user = await userModule.addUser({
            name: req.body.username,
            password: req.body.password,
          })
        res.send(user);
    } catch (error) {
        throw error
    }
    next();
  }, function(req, res) {
      res.send('error');
  });


module.exports = router;