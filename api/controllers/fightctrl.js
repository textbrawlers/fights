'use strict'

let validator = require('../core/validator')
let fight = require('../core/fight/fight')

exports.start = function(req, res) {
  console.log(`Got fight request`)
  let err = {}
  if (validator.validate(req.body, err)) {
    res.json(fight.start(req.body))
  } else {
    console.log(`Failed validation with error: ${err.message}`)
    res.status(400).send(`Bad Request: ${err.message}`)
  }
}
