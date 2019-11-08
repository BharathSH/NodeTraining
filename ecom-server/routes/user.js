const express = require('express');
const users = require('../../http-demo/data')

const router = express.Router();

router.route('/')
    .get((req, res) => {
        res.json(users);
    })
    .post((req, res) => {
        console.log(req.body);

        const newUser = { ...req.body, id: Date.now() };
        users.push(newUser);
        res.status(201).send(newUser);
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