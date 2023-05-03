const matches = require("../Controllers/match.controllers");

module.exports = function(app){


    app.route("/match")
        .post(matches.addNew)  //Create Match
        .patch(matches.updateMatch) //Report Score
        .get(matches.getAll) //Get All Matches (Need to limit to specific tournament)

    app.route("/match/:match_id")
        .get(matches.getOne) //Get One Match    
}