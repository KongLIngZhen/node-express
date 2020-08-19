const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'xihuanchikouhong',
    database: 'node_db',
});

exports.add = (req) => {
    console.log('add', req);
    const users =  { name: req.username, password: req.password };
    const sqlStr = 'INSERT INTO `users` SET ?';

    connection.query(sqlStr, users, (err, res) => {
        if (err) {
        
            return console.log("执行失败：" + err);
        } else {
            console.log(res);
        }
    })

    console.log('mysql connect!');
};


exports.select = (req, callback) => {
    const sqlStr = 'SELECT * FROM `users` WHERE name=' + "'" + req.username + "'";

    connection.query(sqlStr, (err, res) => {
        if (err) {
            return console.log("执行失败：" + err);
        }
        console.log('res', res);
        callback(err, res);
    })

    console.log('mysql connect!');
};

exports.signFund = (req) => {
    try {
        let size = req.pageSize;
        let no = req.pageNo;
        const sqlStr = 'SELECT * FROM `fund` LIMIT ' + `${no-1},${no*size}`;
        
        return new Promise((resolve, reject) => {
            connection.query(sqlStr, (err, result) => {
                if (err) return reject(err);
                console.log('Get data from SQL', result)
                resolve(result);
            })
        })
    } catch (error) {
        console.log(error);
    }
};
