const express = require('express');  
const router = express.Router();
const request = require('request');

let url = 'http://fund.eastmoney.com/data/rankhandler.aspx?op=ph&dt=kf&ft=all&rs=&gs=0&sc=zzf&st=desc&sd=2020-04-25&ed=2021-04-28&qdii=&tabSubtype=,,,,,&pi=1&pn=200&dx=1&v=0.03534910130418445';

router.post('/', async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    console.log(req, 'req');
    let rankData = {};
    rankData = await getData();
    res.send({
        status: 200,
        message: 'success',
        data: rankData
    });
    next();
})

function getData() {
    return new Promise((resolve, reject) => {
        request.post({
            url: url,
            method: 'POST',
            headers: {
                Referer: 'http://fund.eastmoney.com/data/fundranking.html'
            }
        }, (err, res, body) => {
            if(err) {
                console.log(err);
                reject(err);
            } else{
                console.log('*****', body);
                let jsonStr = eval("(" + body.match(/\{[^\}]+\}/)[0] + ")");
                
                resolve(jsonStr)
            }
        })
    })
}

module.exports = router;