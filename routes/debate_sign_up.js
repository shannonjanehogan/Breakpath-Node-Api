const express = require('express');
const moment  = require('moment');
const router  = express.Router();

module.exports = (knex) => {

  router.post('/', (req, res) => {
    knex('debate_sign_up_preferences')
    .insert({
      'name': req.body.name,
      'debater_preference': req.body.debater_preference,
      'partner_preference': req.body.partner_preference,
      'created_at': moment(),
      'updated_at': moment(),
    }).then((results) => {
      res.json(results);
    });
  });

  return router;
}
