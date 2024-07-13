const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/MenuItem');

router.post('/', async (req, res) => {
    try {
        const data = req.body;//Assuming the request body contains tha person data
        // create a new person document using mongoose model
        const newMenu = new MenuItem(data);

        // save the data in database

        const dataResponse = await newMenu.save();
        console.log("Data saved successfully");
        res.status(200).json({ datares: dataResponse, datamsg: "Data saved successfully" });
    } catch (err) {
        console.log("Data failed ", err);
        res.status(500).json({ datamsg: err });
    }
});

router.get('/', async (req, res) => {
    try {
        const dataUser = await MenuItem.find();
        console.log("Data saved successfully");
        res.status(200).json({ datares: dataUser, datamsg: "Data Find successfully" });
    } catch (err) {
        console.log("Data failed ", err);
        res.status(500).json({ datamsg: err });
    }
});

router.get('/:taste', async (req, res) => {
    try {
        const taste = req.params.taste;
        console.log(taste);
        if (taste == 'sweet' || taste == 'sour' || taste == 'spicy') {
            const dataUser = await MenuItem.find({ taste: taste });
            if (dataUser.length === 0) {
                res.status(404).json({ datamsg: "Data Not Found" });
            } else {
                res.status(200).json({ datares: dataUser, datamsg: "Data Find successfully" });
            }
        } else {
            res.status(402).json({ datamsg: "Invalid Data Pass" });
        }

    } catch (err) {
        console.log("Data failed ", err);
        res.status(500).json({ datamsg: err });
    }
});

module.exports = router;