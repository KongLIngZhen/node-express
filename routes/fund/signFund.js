/** 自选 **/
var express = require('express');  
var router = express.Router();
const signFundModule = require('../../modules/fund/signFund');

router.post('/', async (req, res, next) => {
    console.log(req.body);
    const response = await signFundModule.signFund({
        userId: req.body.userId,
        pageSize: req.body.pageSize,
        pageNo: req.body.pageNo
    })
    console.log('====>', response);
    res.send({
        status: 200,
        message: 'success',
        data: {
            list: JSON.parse(JSON.stringify(response))
        }
    })
});

module.exports = router;