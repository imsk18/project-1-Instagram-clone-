const mongoose = require('mongoose')

function connectToDb(){
    mongoose.connect('process.env.DB_URI')
    .then(()=>{
        console.log("connected to db");
        
    })
}

module.exports = connectToDb