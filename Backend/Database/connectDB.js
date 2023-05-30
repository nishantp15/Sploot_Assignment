const mongoose = require('mongoose');
const {DB_CONNECTION_URL} = require("../configs/config")

mongoose.set('strictQuery', true);

async function ConnectDB(){
    return await mongoose.connect(DB_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });
}

module.exports = {ConnectDB};