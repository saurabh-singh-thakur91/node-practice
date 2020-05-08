const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // res.send('Hello world, i have nodemon');

    res.render('index', {title: 'My express app', message: 'hello'})
});

module.exports = router;