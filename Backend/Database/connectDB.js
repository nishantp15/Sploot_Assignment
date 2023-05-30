const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
async function ConnectDB(){
    return await mongoose.connect('mongodb://localhost:27017/auth-example');
}

module.exports = {ConnectDB};