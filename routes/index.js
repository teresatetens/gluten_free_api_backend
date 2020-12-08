const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
res.send('teresa is running with server')
});

module.exports = router;
