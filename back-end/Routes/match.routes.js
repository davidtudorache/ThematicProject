const matches = require("../Controllers/match.controllers");
const authentication = require("../lib/authentication");


module.exports = function(app){


    app.route("/match")
        .post(authentication.isAuthenticated(),matches.addNew)  //Create Match
        .patch(authentication.isAuthenticated(),matches.updateMatch) //Report Score
        .get(matches.getAll) //Get All Matches for a set tournament

    app.route("/match/:match_id")
        .get(matches.getOne) //Get One Match    
}