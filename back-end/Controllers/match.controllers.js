const matches = require("../models/match.models");
const Joi = require("joi");


const getAll = (req,res) => {
   matches.getAll((err,num_rows,results) => {
    if(err) return res.sendStatus(500);

    return res.status(200).send(results)
   })
}


const getOne = (req,res) => {
    let match_id = parseInt(req.params.match_id)

    matches.getOne(match_id, (err,result) => {
        if(err === 404) return res.sendStatus(404)
        if(err) return res.sendStatus(500)

        return res.status(200).send(result)
    })
}

const addNew = (req,res) => {
    const schema = Joi.object({
        "match_no": Joi.number().required(),
        "tournament_id": Joi.number().required()
    })

    const { error } = schema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let match = Object.assign({}, req.body);
    matches.addNew(match, (err, id) => {
        console.log(err);
        if(err) return res.sendStatus(500) //Fails

        return res.status(201).send({match_id: id}) //Success
    })
}

const updateMatch = (req,res) => {
    let match_id = parseInt(req.params.match_id); //Gets Match ID
    let match = [];
    matches.getOne(match_id, (err,result) => {     //Checks Match Exists before Updating
        if(err === 404) return res.sendStatus(404)
        if(err) return res.sendStatus(500);

        const schema = Joi.object({
            "participant_score": Joi.number(),
            "competitor_score": Joi.number(),
            "winner_name": Joi.string()
        })

        const { error } = schema.validate(req.body);
        if(error) return res.status(400).send(error.details[0])


        if (req.body.hasOwnProperty("participant_score")){
            match.participant_score = req.body.participant_score
        }

        if (req.body.hasOwnProperty("competitor_score")) {
            match.competitor_score = req.body.participant_score
        }

        if (req.body.hasOwnProperty("winner_name")) {
            match.winner_name = req.body.winner_name
        }

        matches.updateMatch(match_id,match, (err,id) => {
            if(err) {
                console.log(err)
                return res.sendStatus(500) //Fail
            }

            return res.sendStatus(200) //Success
        })
    })
}


module.exports = {
    getAll: getAll,
    getOne: getOne,
    addNew: addNew,
    updateMatch: updateMatch

}