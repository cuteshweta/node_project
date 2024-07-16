const express = require('express');
const router = express.Router();
const Person = require('./../models/person');

router.post('/', async (req, res) => {
    try {
        const data = req.body;//Assuming the request body contains tha person data
        // create a new person document using mongoose model
        const newPerson = new Person(data);

        // save the data in database

        const dataResponse = await newPerson.save();
        console.log("Data saved successfully");
        res.status(200).json({ datares: dataResponse, datamsg: "Data saved successfully" });
    } catch (err) {
        console.log("Data failed ", err);
        res.status(500).json({ datamsg: err });
    }
});

router.get('/', async (req, res) => {
    try {
        const dataUser = await Person.find();
        if (dataUser.length === 0) {
            res.status(404).json({ datamsg: "Data Not Find" });
        } else {
            console.log("Data saved successfully");
            res.status(200).json({ datares: dataUser, datamsg: "Data Find successfully" });
        }

    } catch (err) {
        console.log("Data failed ", err);
        res.status(500).json({ datamsg: err });
    }
});

router.get('/:worktype', async (req, res) => {
    try {
        const worktype = req.params.worktype;
        if (worktype == 'chef' || worktype == 'waiter' || worktype == 'manager') {
            const dataUser = await Person.find({ work: worktype });
            console.log("Data saved successfully");
            res.status(200).json({ datares: dataUser, datamsg: "Data Find successfully" });
        } else {
            res.status(404).json({ datamsg: "Invalid Data Pass" });
        }

    } catch (err) {
        console.log("Data failed ", err);
        res.status(500).json({ datamsg: err });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const dataUser = await Person.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });
        console.log(id);
        if (!dataUser) {
            res.status(202).json({ datamsg: "Data Not FInd" });
        } else {
            res.status(200).json({ datares: dataUser, datamsg: "Data Find successfully" });
        }
    } catch (err) {
        console.log("Data failed ", err);
        res.status(500).json({ datamsg: err });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const dataUser = await Person.findByIdAndDelete(id);
        if (!dataUser) {
            res.status(202).json({ datamsg: "Data Not FInd" });
        } else {
            res.status(200).json({ datamsg: "Data Deleted successfully" });
        }
    } catch (err) {
        console.log("Data failed ", err);
        res.status(500).json({ datamsg: err });
    }
});

module.exports = router;