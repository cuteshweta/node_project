const mongoose = require('mongoose');
require('dotenv').config();

// Define the MongoDB connection Url
const mongodb = process.env.MONGODBURL;

// // Set Up MongoDB connection
mongoose.connect(mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Get The Default Connection
// Mongoose maintains a defult connection object representing the mongoDB connection
const db = mongoose.connection;

// Define event Listeners for Dtabase Connection
// below is connection event listner
db.on('connected', () => {
    console.log("Connected to mongodb Server");
});

db.on('disconnected', () => {
    console.log("MongoDB Disconnected");
});

db.on('error', (err) => {
    console.log("MongoDB connection error", err);
});

module.exports = db; 