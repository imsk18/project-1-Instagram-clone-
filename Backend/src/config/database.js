const mongoose = require("mongoose");

async function connectToDb() {
    await mongoose.connect(process.env.DB_URI);

    console.log("connected to DB")
    
}
module.exports = connectToDb