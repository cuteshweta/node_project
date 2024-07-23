const express = require('express');
const app = express();
const db = require('./db');
const passport = require('./auth');
const bodyParser = require('body-parser');

require('dotenv').config();
app.use(bodyParser.json());




app.use(passport.initialize());
const localAuthenticateData = passport.authenticate('local', { session: false });

app.get('/', function (req, res) {
    res.send("welcome to hotel");
});

// create moddleware
const logRequest = (req, res, next) => {
    const d = new Date();
    let text = d.toLocaleString();
    console.log(`${text} Request Mode to : ${req.url}`);
    next();
}

app.use(logRequest);

// import person routes
const personRoutes = require('./routes/personRoutes');
app.use('/person', personRoutes);

// import menu routes
const menuRoutes = require('./routes/menuRoutes');
const Person = require('./models/person');

app.use('/menuitem', menuRoutes);

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log("Listing on Port 3000");
});