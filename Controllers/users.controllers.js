const users = require("../models/users.models");
const Joi = require("joi");

const getAll =(req,res) => {
    users.getAllUsers((err, num_rows, results) => {
        if(err) return res.sendStatus(500);

        return res.status(200).send(results);
    })
}

const addNew = (req, res) => {
    const schema = Joi.object({
        "user_name": Joi.string().required(),
        "email": Joi.string().required().email({minDomainSegments: 2}),
        "password": Joi.string().required().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,25}$/)) //RegEx may not work (same one as i used for full stack which was tempramental)
    })

    const { error } = schema.validate(req.body); //Validates incoming request
    if(error) return res.status(400).send(error.details[0].message);

    let user = Object.assign({},req.body)

    users.addNewUser(user, (err, id) => {
        if(err) return res.sendStatus(500) //Fail

        return res.status(201).send({user_id: id})
    })
}

const getOne = (req, res) => {
    let user_id = parseInt(req.params.user_id)

    users.getOne(user_id, (err,result) => {
        if(err === 404) return res.sendStatus(404)
        if(err) return res.sendStatus(500)

        return res.status(200).send(result) //Success sends user details
    })
}



const login = (req,res) => {

    const schema = Joi.object({
        "email": Joi.string().required(),      
          "password": Joi.string().required()     
          })
    
          const { error } = schema.validate(req.body);  //Validates request
         if(error) return res.status(400).send(error.details[0].message);
    
     users.authenticateUser(req.body.email, req.body.password, (err,id) => {   //Checks if login is valid
        if(err === 404) return res.status(400).send("Invalid email/password")
        if(err) return res.sendStatus(500)

        users.getToken(id, (err, token) => {            //Generates Token if needed and sets it to user id for authentication
                if(err) return res.sendStatus(500)

                if(token){  //Checks for existing token
                    return res.status(200).send({user_id: id, session_token: token})  //Sends token and user id
                }
                else{
                    users.setToken(id, (err, token) => {   //Sets new token if a token doesnt exist 
                        if(err) return res.sendStatus(500) 
                        return res.status(200).send({user_id: id, session_token: token})
                    })
                }
            })
     })
    
}

const logout = (req,res) => { //Deletes token to logout
    let token = req.get("X-Authorization")
    users.removeToken(token, (err) => {
        if(err) return res.sendStatus(401)

        return res.sendStatus(200)
    })
 }


module.exports = {
    getAll: getAll,
    getOne: getOne,
    addNew: addNew,
    login: login,
    logout: logout

} 