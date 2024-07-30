const express = require('express');
const app = express();
const dotenv = require('dotenv');
const morgan = require('morgan');
const authroutes = require('./Routes/authroutes');
const applicationroutes = require('./Routes/applicationroutes');
const jobroutes = require('./Routes/jobroutes');
const userprofileroutes = require('./Routes/userprofileroutes');
const recomendedroutes = require('./Routes/Recomendroute')
const connectDB = require('./config/db');
const cors = require('cors');
const cloudinary = require('cloudinary');
const fileUpload = require('express-fileupload');


dotenv.config();

//middlewares

cloudinary.v2.config({
    cloud_name: process.env.cloudinary_client_name,
    api_key: process.env.cloudinary_api_key, 
    api_secret: process.env.cloudinary_secretkey,
});//cloudianry is used for files images vedios storing inside the database

app.use(fileUpload({
      useTempFiles: true,
      tempFileDir: "/tmp/",
    })
  );//for uploading files

connectDB();
const port = 4600
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({extended : true }));//for passing form data

//routes middlewares
app.use('/api/v1/auth',authroutes);
app.use('/api/v1/application',applicationroutes);
app.use('/api/v1/job',jobroutes);
app.use('/api/v1/recomendedjobs',recomendedroutes);
app.use('/api/v1/userprofile',userprofileroutes);

app.get('/',(req,res)=>{
    res.status(200).send("This is server side programming");
})

app.listen(process.env.PORT||port,()=>{
    console.log(`server is running at port ${port}`);
})