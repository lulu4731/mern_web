const mongoose = require('mongoose');
const { exists } = require('../../app/model/Post');
require('dotenv').config();

const connect = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-learnit.e03ss.mongodb.net/mern-learnit?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log("Connect Successfully");
    } catch (error) {
        console.log("Connect Fail");
    }
}


module.exports = { connect };