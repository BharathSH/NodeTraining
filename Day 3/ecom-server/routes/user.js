const express = require('express');
const users = require('../../../http-demo/data')
const User = require('../models/user');
const bCrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const admin= require('../middleware/admin');

const router = express.Router();

router.route('/')
    .get([auth,admin],async (req, res) => {
        console.log(req.body);
        try {
            const users = await User.find();
            res.status(201).json(users);
        } catch (err) {
            res.status(201).send({ message: 'fetch user failed', erorr: err.message });
        }
       
    })
    .post(auth,async (req, res) => {
        console.log(req.body);
        try {
            const hashPassword = await bCrypt.hash(req.body.password, 10);
            req.body.password= hashPassword;
            const newUser = await User.create({ ...req.body });
            res.status(201).send(newUser);
        } catch (err) {
            res.status(201).send({ message: 'create user failed', erorr: err.message });
        }
       
    });


router.route('/:id')
    .get((req, res) => {
        const id = req.params.id;
        console.log(id);
        const filterObj = users.find(x => x.id === parseInt(id));
        res.json(filterObj);
    })
    .put((req, res) => {
        const id = req.params.id;
        // console.log(id);
        const filterObj = users.find(x => x.id === parseInt(id));
        if (!filterObj) {

            return res.send("not found");
        }
        // console.log(req.body);
        // console.log(req.body.name);
        filterObj.name = req.body.name;
        res.json(users);
    })
    .delete((req, res) => {
        const id = req.params.id;
        // console.log(id);
        const index = users.findIndex(x => x.id === parseInt(id));
        if (index > 0) {

            return res.send("not found");
        }

        users.splice(index, 1)
        // console.log(req.body);
        // console.log(req.body.name);

        res.json(users);
    });

module.exports = router