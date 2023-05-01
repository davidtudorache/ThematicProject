const users = require("../Controllers/users.controllers");
const authentication = require("../lib/authentication.js")


module.exports = function(app){
    
    
    app.route("/user")
        .get(users.getAll) //Get All users
        .post(authentication.isAuthenticated,users.addNew) //add new user


    app.route("/user/:user_id")
        .get(users.getOne); //Get One User
    

    app.route("/login")
        .post(users.login); //login

    app.route("/logout")
        .post(authentication.isAuthenticated, users.logout); //logout

    app.route("/player")
        .post() //creates player

}