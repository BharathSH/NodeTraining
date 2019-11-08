const express = require('express');
const {products} = require('../../http-demo/data')

const router = express.Router();


router.route('/')
.get((req, res) => {
    res.json(products);
})
.post((req, res) => {
    console.log(req.body);

    const newProd = { ...req.body, id: Date.now() };
    products.push(newProd);
    res.status(201).send(newProd);
});


router.route('/:id')
.get((req, res) => {
    const id = req.params.id;
    console.log(id);
    const filterObj = products.find(x => x.id === parseInt(id));
    res.json(filterObj);
})
.put((req, res) => {
    const id = req.params.id;
    // console.log(id);
    const filterObj = products.find(x => x.id === parseInt(id));
    if (!filterObj) {

        return res.send("not found");
    }
    // console.log(req.body);
    // console.log(req.body.name);
    filterObj.name = req.body.name;
    res.json(products);
})
.delete((req, res) => {
    const id = req.params.id;
    // console.log(id);
    const index = products.findIndex(x => x.id === parseInt(id));
    if (index > 0) {

        return res.send("not found");
    }

    products.splice(index, 1)
    // console.log(req.body);
    // console.log(req.body.name);

    res.json(products);
});

module.exports = router;