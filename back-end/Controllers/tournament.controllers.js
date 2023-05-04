const tournaments = require("../models/tournament.models");
const Joi = require("joi");


const getAll = (req,res) => {
    tournaments.getAll((err,num_rows,results) => {
        if(err) return res.sendStatus(500);

        return res.status(200).send(results);
    })
}


const addNew = (req, res) => {
    const schema = Joi.object({
        "tournament_name": Joi.string().required(),
        "tournament_game": Joi.string().required,
        "tournament_host": Joi.string().required(),
        "player_id": Joi.number().required(),
        "user_id": Joi.number.required()
    })

    const { error } = schema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    let tournament = Object.assign({}, req.body);
    tournaments.addNew(tournament, (err,id) => {
        if(err) return res.sendStatus(500)

        return res.status(201).send({tournament_id: id})
    })
}

const getOne = (req, res) => {
    let tournament_id = parseInt(req.params.tournament_id)

    tournaments.getOne(tournament_id, (err,result) => {
        if(err === 404) return res.sendStatus(404)
        if(err) return res.sendStatus(500)

        return res.status(200).send(result) 
    })
}

const deleteTournament = (req,res) => {
    let tournament_id = parseInt(req.params.tournament_id) 
    
    tournaments.deleteTournament(tournament_id, (err,id) => {
        if(err) {
            console.log(err)
            return res.sendStatus(500)
        }
        return res.sendStatus(200)
    })
}

const updateTournament = (req,res) => {
    let tournament_id = parseInt(req.params.tournament_id) 

    const schema = Joi.object({
        "tournament_name": Joi.string(),
        "tournament_game": Joi.string(),
        "tournament_host": Joi.string(),
        "player_id": Joi.number(),
        "user_id": Joi.number()
    })

    const { error } = schema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    if (req.body.hasOwnProperty("tournament_name")){
        tournament.tournament_name = req.body.tournament_name
    }

    if (req.body.hasOwnProperty("tournament_game")){
        tournament.tournament_game = req.body.tournament_name
    }

    if (req.body.hasOwnProperty("tournament_host")){
        tournament.tournament_host = req.body.tournament_host
    }

    if (req.body.hasOwnProperty("player_id")){
        tournament.player_id = req.body.player_id
    }

    if (req.body.hasOwnProperty("user_id")){
        tournament.user_id = req.body.user_id
    }

    tournaments.updateTournament(tournament_id,tournament, (err, id) => {
        if(err) {
            console.log(err)
            return res.sendStatus(500)
        }

        return res.sendStatus(200) 
    })

}


module.exports = {
    getAll: getAll, 
    getOne: getOne,
    addNew: addNew,
    updateTournament: updateTournament,
    deleteTournament: deleteTournament
}