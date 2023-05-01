const matches = require("../models/match.models");
const Joi = require("joi");


const getAll = (req,res) => {
   
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
        "match_no": Joi.number.required(),
        "round_id": Joi.number.required()
    })

    const { error } = schema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let match = Object.assign({}, req.body);
    matches.addNew(match, (err, id) => {
        if(err) return res.sendStatus(500) //Fails

        return res.status(201).send({match_id: id}) //Success
    })

}

module.exports = {
    getAll: getAll,
    getOne: getOne,
    addNew: addNew

}