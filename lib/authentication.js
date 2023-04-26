const users = require("../models/users.models");


const isAuthenticated = function(req, res, next){ //Checks the user is authenticated
    let token = req.get("X-Authorization");

    users.getIdFromToken(token, (err, id) => {  
        if (err || id === null) {           //checks for token from Id
            return res.sendStatus(401);
        }
        next();    //passes authentication
    });
};


module.exports = {
    isAuthenticated: isAuthenticated
}