const sqlite3 = require('sqlite3').verbose()
const crypto = require("crypto")

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.') 

        db.run(`CREATE TABLE users (
                    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_name text,
                    email text UNIQUE,
                    password text,
                    salt text,
                    session_token text,
                    CONSTRAINT email_unique UNIQUE (email)
                )`,
            (err) => {

                if(err){
                    console.log("Users table already created")
                }else{
                    console.log("Users table created")
                }


                const ADMIN_PASSWORD = "Admin123!"

                const getHash = function(password, salt){
                    return crypto.pbkdf2Sync(password, salt, 100000, 256, 'sha256').toString('hex');
                };

                const INSERT = 'INSERT INTO users (user_name, email, password, salt) VALUES (?,?,?,?)'
                const salt = crypto.randomBytes(64);
                const hash = getHash(ADMIN_PASSWORD, salt);

                db.run(INSERT, ["admin", "admin@admin.com", hash, salt.toString('hex')], (err) => {
                    if(err){
                        console.log("Admin account already exists")
                    } 
                })
            }
        )

        db.run(`CREATE TABLE players (
                    player_id INTEGER PRIMARY KEY AUTOINCREMENT,
                    player_wins INTEGER,
                    player_losses INTEGER,
                    player_rank INTEGER,
                    player_name text,
                    FOREIGN KEY(created_by) REFERENCES users(user_id)
                )`,
            (err) => {
                if(err ==404){
                    console.log("404")
                }else if(err==401){
                    console.log("401")
                }else if (err==500){
                    console.log("500")
                }else if (err==400){
                    console.log("400")
                }else{
                    console.log("Players table created")
                }
            }
        )

        db.run(`CREATE TABLE tournaments (
                    tournament_id INTEGER PRIMARY KEY AUTOINCREMENT,
                    tournament_name text,
                    tournament_game text,
                    tournament_host text,
                    player_id INTEGER,
                    user_id INTEGER,
                    FOREIGN KEY(player_id) REFERENCES players(player_id)
                    FOREIGN KEY(user_id) REFERENCES users(user_id)
                )`,
            (err) => {
                if(err){
                    console.log("Tournaments table already created")
                }else{
                    console.log("Tournaments table created")
                }
            }
        )
        db.run(`CREATE TABLE match (
                    match_id INTEGER PRIMARY KEY AUTOINCREMENT,
                    match_no INTEGER,
                    participant_score INTEGER,
                    competitor_score INTEGER,
                    winner_name text,
                    tournament_id INTEGER,
                    FOREIGN KEY(tournament_id) REFERENCES tournament(tournament_id)
                )`,
            (err) => {
                if(err){
                    console.log("Match table already created")
                }else{
                    console.log("Match table created")
                }
            }
        ) 
    }
});


module.exports = db