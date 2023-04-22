const users = require("../Controllers/users.controllers");



module.exports = function(app){
    
    
    app.route("/user")
        .get(users.getAll) //Get All users
        .patch() //Update User (May be unneeded)
        .post(users.addNew) //add new user


    app.route("/user/:user_id")
        .get(users.getOne); //Get One User
    

    app.route("/login")
        .post(users.login); //login

    app.route("/logout")
        .post(users.logout); //logout



}