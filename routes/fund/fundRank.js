/** rank **/
const express = require('express');  
const router = express.Router();

const spider = require('../../spider/fund/index');

const URL = 'http://fund.eastmoney.com/data/rankhandler.aspx?op=ph&dt=kf&ft=all&rs=&gs=0&sc=1yzf&st=desc&sd=2019-11-24&ed=2020-11-24&qdii=&tabSubtype=,,,,,&pi=1&pn=50&dx=1&v=0.7014174952064982';

var rankList = [];

router.post('/', async (req, res, next) => {
    console.log(req.body, 'req.body--->');
    res.send({
        status: 200,
        message: 'success',
        data: {
            list: JSON.parse(JSON.stringify(rankList))
        }
    });
    next();
});
spider.queue(URL, function(doc) {
    if (doc.res.body) {
        // console.log('#####' + doc.res.body + '#####');
        // console.log(doc.res.body.match(/{(\S*)}/));
        let dataString = doc.res.body; 
        let a = dataString.split('{datas:["');
        let b = a[1].split(',"],');
        let c = b[0];
        let arr = [];
        let list = [];
        arr = c.split(',","');
        list = arr.map(element => {
            return element.split(',');
        });
        rankList = list.map((item, i) => {
            return { 
                key: i,
                code: item[0],
                name: item[1], 
                chnAcronyms: item[2],
                date: item[3],
                unitWorth: item[4],
                worth: item[5],
                todayRate: item[6],
                weekRate: item[7],
                monthRate: item[8],
                threeMonthRate: item[9],
                sixMonthRate: item[10],
                yearRate: item[11],
                twoYearRate: item[12],
                threeYearRate: item[13],
                thisYearRate: item[14],
                totalRate: item[15],
            }
        });
    }
});

module.exports = router;