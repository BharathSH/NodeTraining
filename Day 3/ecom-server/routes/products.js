const express = require('express');
const { products } = require('../../../http-demo/data');
const Products = require('../models/product')
const auth = require('../middleware/auth');


const router = express.Router();


router.route('/')
    .get(async (req, res) => {
        console.log(req.body);
        try {
            const products = await Products.find();
            res.status(201).json(products);
        } catch (err) {
            res.status(201).send({ message: 'fetch products failed', erorr: err.message });
        }
    })
    .post(auth,async (req, res) => {
        console.log(req.body);
        try {
            const newProduct = await Products.create({ ...req.body });
            res.status(201).send(newProduct);
        } catch (err) {
            res.status(201).send({ message: 'create products failed', erorr: err.message });
        }
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