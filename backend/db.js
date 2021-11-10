const mongodb = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/iNotebook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false'

const connectToMongo = ()=>{
    mongodb.connect(mongoURI, ()=>{
        console.log("Connected to database.");
    })
}

exports.connectToMongo = connectToMongo;