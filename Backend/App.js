require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app  =  express();


const {ConnectDB} = require('./Database/connectDB')
const AuthRouter = require('./routes/routes')

app.use(express.json());
app.use(logRequest);
app.use(cors());


ConnectDB().then(()=>{
    app.listen(3040, ()=>{
        console.log('Listening on 3040')
    })
})

app.use('/auth', AuthRouter);

async function logRequest(req, res, next){
    console.log('kjbkjb')
    next();
}



