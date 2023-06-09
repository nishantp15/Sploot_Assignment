require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app  =  express();
const cookieParser = require("cookie-parser");

const {PORT} = require('./configs/config')
const {ConnectDB} = require('./Database/connectDB');
const userRouter = require('./routes/userRoutes');
const articleRouter = require("./routes/articleRoutes");

app.use(express.json());
app.use(logRequest);
app.use(cors());
app.use(cookieParser());


app.use('/', userRouter);
app.use('/', articleRouter);

app.use('/*', (req, res) => {
    return res.status(404).send({
        statusCode: 404,
        message: "Address not found",
      })
});

async function logRequest(req, res, next){
    next();
};

portAddress = PORT || 3030

ConnectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Listening on ${PORT}`)
    })
});



