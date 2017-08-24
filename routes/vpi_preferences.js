const express = require('express');
const moment  = require('moment');
const router  = express.Router();

module.exports = (knex) => {

  router.post('/', (req, res) => {
    knex('vpi_preferences')
    .insert({
      'judgeless_rooms': req.body.judgeless_rooms,
      'room_type': req.body.room_type,
      'created_at': moment(),
      'updated_at': moment(),
    }).then((results) => {
      res.json(results);
    });
  });

  return router;
}
