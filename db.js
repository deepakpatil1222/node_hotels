const mongoose = require('mongoose');

const mongodbURL = "mongodb://127.0.0.1:27017/hotels";

mongoose.connect(mongodbURL, {
    useNewUrlParser : true,
    useUnifiedTopology : true
});

const db = mongoose.connection;

db.on('connected', () => {
    console.log("Connected to MongoDb server");
});

db.on('error', (err) => {
    console.log("MongoDB connection error", err);
});

db.on('disconnected', () => {
    console.log("Disconnected to MongoDb server");
});


module.exports = db;