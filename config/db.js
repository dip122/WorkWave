const mongoose = require('mongoose');

const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL,{
        });
        console.log(`Our MongoDb server is running at port ${conn.connection.port}`);
        console.log("MongoDb is running successfully");
    }catch(error){
        console.log(error);
    }
};

module.exports = connectDB;