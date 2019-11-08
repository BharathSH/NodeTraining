const express = require('express');

const {users}
 = require('../../../http-demo/data');

const router = express.Router();

router.get('/', (req, res) => {
    res.send(" Welcome to ECOM ");
});


router.get('/users',(req,res)=>{
res.render('users',{users});
});

module.exports = router;