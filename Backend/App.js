require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app  =  express();


const {ConnectDB} = require('./Database/connectDB')
const AuthRouter = require('./routes/userRoutes')
const articleRouter = require("./routes/articleRoutes")

app.use(express.json());
app.use(logRequest);
app.use(cors());


app.use('/', AuthRouter);
app.use('/', articleRouter)

async function logRequest(req, res, next){
    // console.log('kjbkjb')
    next();
}

ConnectDB().then(()=>{
    app.listen(3040, ()=>{
        console.log('Listening on 3040')
    })
})



