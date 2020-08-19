const sql = require('../mysql/index');

console.log('module sql', sql);

exports.addUser = (req, err) => {
    sql.add(req);
    console.log(err);
}

exports.selectUser = (req, callback) => {
    console.log('--->', req);
    sql.select(req, (err, res) => {
        if(err) {

        } else {
            console.log('callback', res);
        }
        callback(err, res);
    });
    
}
