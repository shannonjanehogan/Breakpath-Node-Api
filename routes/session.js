const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.post('/login', (req, res) => {
    knex.select('id')
    .from('users')
    .where({
      'email': req.body.email,
      'password': req.body.password,
    }).then((results) => {
      if (results.length === 1) {
        let user_id = results[0].id;
        res.json(user_id)
      } else {
        res.sendStatus(403);
      }
    });
  });

  return router;
}
