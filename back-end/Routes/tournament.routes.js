const tournaments = require("../Controllers/tournament.controllers")

module.exports = function(app){
    
    app.route("/tournament")
        .post(tournaments.addNew) //Create Tournament
        .get(tournaments.getAll) //Get List of All tournaments
    
    app.route("/tournament/:tournament_id")
        .patch(tournaments.updateTournament) //Update Tournament (Add New Match?)
        .get(tournaments.getOne) //get One tournament     

} 