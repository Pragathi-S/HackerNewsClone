const mongoose = require("mongoose");

// to connect database
const connectDB = async () => {
    await mongoose.connect('mongodb://localhost:27017/hackernews'),{
    };
    console.log("MongoDB connected");

};

module.exports = connectDB;