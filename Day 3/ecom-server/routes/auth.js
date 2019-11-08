const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const User = require('../models/user');
const secretKey = "KEY";

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const email = req.body.email;
        console.log(email);
        const user = await User.findOne({ email });
        console.log(user);
        if (!user) {
            return res.status(400).json({ messgae: "wrong email or password" });
        }

        // const result = await bcrypt.compare(req.body.password,user.password);
        // console.log('result',result);
        // if(!result){
        //     return res.status(400).json({ messgae: "wrong password" });
        // }
        const payload = _.pick(user,['_id','name', 'isAdmin']);
        const token = jwt.sign(payload,secretKey);
        return res.status(201).json({ messgae: "Login successfull",token });
    }
    catch (e) {
        return res.status(500).json({ messgae: "Login Server Error!!" });
    }
});


module.exports = router;