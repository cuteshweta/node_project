const express = require('express');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
// this function gives error save function is not longer take callback 
// Post route to add Person
// app.post('/person', (req, res) => {
//     const data = req.body;//Assuming the request body contains tha person data
//     // create a new person document using mongoose model
//     const newPerson = new Person(data);

//     // save the data in database

//     newPerson.save((error, savedPerson) => {
//         if (error) {
//             console.log("Error Saving Person: ", error);
//             res.status(500).json({ error: "Internal Server Error" });
//         } else {
//             console.log("Person Data Successfully Saved");
//             res.status(200).json(savedPerson);
//         }
//     });

//     // to avoid line of code we have to pass the data in person model show line 14
//     // newPerson.name=data.name;
//     // newPerson.age=data.age;
//     // newPerson.work=data.work;

// });


// create menuitem and fatch menu item



// import person routes
const personRoutes = require('./routes/personRoutes');
app.use('/person', personRoutes);

// import menu routes
const menuRoutes = require('./routes/menuRoutes');

app.use('/menuitem', menuRoutes);

app.listen(3000, () => {
    console.log("Listing on Port 3000");
});