const sql = require('../../mysql/index');

exports.signFund = async (req) => {
    try {
        let res = await sql.signFund(req);
        return new Promise((resolve) => {
            resolve(res);
        })
    } catch (error) {
        console.log(error);
    }
}