const express = require('express');

const app = express;


// 注册
app.post('/api/register', async (req, res) => {
    res.send('register')
})


app.listen(3010, () => {

})