const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

const url = 'mongodb://127.0.0.1:27017/admin';

mongoose.connect(url, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    user: 'konglingzhen',
    pass: '123456',
});


const userSchema = {
    username: { type: String, unique: true },
    password: {
        type: String,
        set (val) {
            // return bcrypt.hashSync(val, 10);
        }
    },
}

const Users = mongoose.model('Users', userSchema)

// Users.db.dropCollection('users');

mongoose.connection.on('connected', (s) => {
    console.log('连接mongodb成功')
})

mongoose.connection.on('error', (e) => {
    console.log(e);
})


module.exports = {
    Users,
}