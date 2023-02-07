const mongoose = require('mongoose');
mongoose.set('strictQuery',false);
const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const app =express();
const path = require('path');
const cors = require('cors');
// const DbConnect = require('./config/db');

const corsOptions = {
    origin:process.env.ALLOWED_CLIENTS.split(',')
}

app.use(cors(corsOptions));

PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser')
app.use(bodyParser.json());

app.use('/api/files',require('./routes/files'));
app.use('/files',require('./routes/show'));
app.use('/files/download',require('./routes/download'))

app.use(express.static('public'))

app.set('views',path.join(__dirname,'/views'));
app.set('view engine','ejs');

//DBconnect
const DbConnect = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_CONNECTION_URL,
            {
                useNewUrlParser:true,
                UseUnifiedTopology:true,
            });
            console.log("Db connected")
    } catch(err)
    {
        console.log(err);
    }
}

DbConnect().then(()=>
{
    app.listen(PORT,()=>{
        console.log(`Listening on port ${PORT}`)
    })
})
