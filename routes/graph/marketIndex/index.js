/** rank **/
const express = require('express');  
const router = express.Router();

const spider = require('../../../spider/marketIndex/index');

const URL = 'http://push2.eastmoney.com/api/qt/stock/get?secid=0.399001&ut=bd1d9ddb04089700cf9c27f6f7426281&fields=f57,f58,f59,f107,f43,f169,f170,f135,f136,f137,f193,f138,f139,f140,f194,f141,f142,f143,f195,f144,f145,f146,f196,f147,f148,f149,f197&invt=2&cb=jQuery11240790040469606045_1607257729199&_=1607257729400';

var list = {};

router.post('/', async (req, res, next) => {
    console.log(req.body, 'req.body--->');
    res.send({
        status: 200,
        message: 'success',
        data: {
            list: list,
        }
    });
    next();
});
spider.queue(URL, function(doc) {
    if (doc.res.body) {
        console.log('------------------------------>', doc.res.body.data)
        list = doc.res.body; 
    }
});

module.exports = router;