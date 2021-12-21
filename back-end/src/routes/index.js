const newAuth = require("./auth");
const newPost = require('./post');


function route(app){
    app.use('/api/auth', newAuth);
    app.use('/api/post', newPost);
}


module.exports = route