const db = require("../database.js");


const addNew = (match,done) => {
    const sql = "INSERT into match (match_no,participant_score,competitor_score,round_id) VALUES (?,?,?,?)"
    let values = [match.match_no,0,0,match.round_id]
    
    
    db.run(sql, values, function(err) {  //executes SQL query
        if(err) return done(err)

        return done(null,this.lastID); //returns match id - success
    })


}

const getAll = (id, done) => {              //Gets All from ONE tournament 
    const results =[];

    db.each(
        "SELECT * FROM match",
        [],
        (err, row) => {
            if(err) console.log("Something went wrong: " + err);

            results.push({
               match_id: row.match_id,
               match_no: row.match_no,
               
            });
        },
        (err, num_rows) => {
            return done(err, num_rows, results);
        }
    )
}


const getOne = (id, done) => {
    const sql = "SELECT * FROM match WHERE match_id = ?"

        db.get(sql,[id], (err,row) => {
            if(err) return done(err)
            if(!row) return done(404)


            return done(null, {
                match_no: row.match_no,
                participant_score: row.match_no,
                competitor_score: row.competitor_score,
                winner_name: row.winner_name
            })
        })
}

const updateMatch = (match, done) => {

}


module.exports = {
    addNew: addNew,
    getAll: getAll,
    getOne: getOne,
    updateMatch: updateMatch
}