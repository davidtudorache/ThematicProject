const db = require("../database.js");

const addNew = (tournament, done) => {
    const sql = "INSERT INTO tournaments (tournament_name,tournament_game,tournament_host,user_id,player_id) VALUES (?,?,?,?,?)"
    let values = [tournament.tournament_name,tournament.tournament_game,tournament.tournament_host,tournament.user_id,tournament.player_id]

    db.run(sql,values,function(err) {
        if(err) return done(err)

        return done(null, this.lastID);
    })
}

const getOne = (id,done) => {
    const sql = "SELECT * FROM tournaments WHERE tournament_id = ?"

    db.get(sql,[id], (err,row) => {
        if(err) return done(err)
        if(!row) return done(404)

        return done(null, {
            tournament_id: row.tournament_id,
            tournament_name: row.tournament_name,
            tournament_game: row.tournament_game,
            tournament_host: row.tournament_host,
            player_id: row.player_id,
            user_id: row.user_id
        })
    })
}

const getAll = (done) => {
    const results = [];

    db.each(
        "SELECT * FROM tournaments",
        [],
        (err, row) => {
            if (err) console.log("Something went wrong: " + err);

            results.push({
                tournament_id: row.tournament_id,
                tournament_name: row.tournament_name,
                tournament_game: row.tournament_game,
                tournament_host: row.tournament_host,
                player_id: row.player_id,
                user_id: row.user_id
            });
        },
        (err, num_rows) => {
            return done(err,num_rows,results);
        }
    )
}



const updateTournament = (id, tournament, done) => {
    const sql = "UPDATE tournaments SET tournament_name=?, tournament_game=?, tournament_host=?, player_id=?, user_id=? WHERE tournament_id=?"
    let values = [tournament.tournament_name,tournament.tournament_game,tournament.tournament_host, tournament.player_id,tournament.user_id, id];

    db.run(sql,values, (err) => {
        return done(err)
    })
}




module.exports = {
    getAll: getAll,
    addNew: addNew,
    getOne: getOne,
    
    updateTournament: updateTournament
}