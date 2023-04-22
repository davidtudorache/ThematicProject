const db = require("../database.js");
const crypto = require("crypto")


const getAllUsers = (done) => {
    const results =[];

    db.each(
        "SELECT * FROM users",
        [],
        (err, row) => {
            if(err) console.log("Something went wrong: " + err);

            results.push({
                user_id: row.user_id,
                user_name: row.user_name,
                email: row.email
            });
        },
        (err, num_rows) => {
            return done(err, num_rows, results);
        }
    )
    }


 const addNewUser = (user, done) => {    //Creates New User
    const salt = crypto.randomBytes(64);     //Adds salt and hashes password
    const hash = getHash(user.password, salt);
    
        const sql = "INSERT INTO users (user_name, email, password, salt) VALUES (?,?,?,?,?)"
        let values = [user.user_name, user.email, hash, salt.toString("hex")];   //Adds values to query
    
        db.run(sql, values, function(err) {  //executes SQL query
            if(err) return done(err)
    
            return done(null,this.lastID); //returns user id - success
        })
    }
  
  const getOne = (id, done) => {
        const sql = "SELECT * FROM users WHERE user_id = ?"

        db.get(sql,[id], (err,row) => {
            if(err) return done(err)
            if(!row) return done(404)


            return done(null, {
                user_id: row.user_id,
                user_name: row.user_name,
                email: row.email
            })
        })
  }  

  const getHash = function(password,salt){
    return crypto.pbkdf2Sync(password, salt, 100000,256, "sha256").toString("hex");
   }

const removeToken = (token, done) => {
    const sql = "UPDATE users SET session_token=null WHERE session_token=?"

    db.run(sql,[token],(err) => { //Executes SQL query
        return done(err)
    })
}

const setToken = (id, done) => {
    let token = crypto.randomBytes(16).toString("hex"); //Generates token 

    const sql = "UPDATE users SET session_token=? WHERE user_id=?"  //adds token into users table

    db.run(sql, [token, id], (err) => {
        return done(err, token)
    })
}

const getIdFromToken = (token, done) => {
    const sql = "SELECT user_id FROM users WHERE session_token=?"
    

    db.get(sql, [token], (err,row) => { //Executes SQL query
        if(err) return done(err)
        if(!row) return done(404)

        return done(err, row.user_id); //returns userid
})
}

const getToken = (id, done) => {  //Gets existing token
    const sql = "SELECT session_token FROM users WHERE user_id =?"   

    db.get(sql, [id], (err,row) => { //Executes SQL
        if(err) return done(err)
        if(!row) return done(404)

        return done(err, row.session_token);
    
    })
}

const authenticateUser = (email, password, done) => {
    const sql = "SELECT user_id, password, salt FROM users WHERE email=?"

    db.get(sql, [email], (err,row) => {
        if(err) return done(err)
        if(!row) return done(404) //Incorrect Email

        if(row.salt === null) row.salt = ""

        let salt = Buffer.from(row.salt, "hex")

        if(row.password === getHash(password,salt)){
            return done(false, row.user_id)  //Correct Password
        }
        else{
            return done(404)  //Incorrect Password
        }
    })
}


    module.exports = {
        getAllUsers: getAllUsers,
        addNewUser: addNewUser,
        setToken: setToken,
        removeToken: removeToken,
        getOne: getOne,
        getIdFromToken: getIdFromToken,
        getToken: getToken,
        authenticateUser: authenticateUser
    }