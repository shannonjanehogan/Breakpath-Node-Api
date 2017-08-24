const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get('/', (req, res) => {
    knex
      .select('*')
      .from('sorted_rooms')
      .then((results) => {
        res.json(results);
    });
  });

  return router;
}
