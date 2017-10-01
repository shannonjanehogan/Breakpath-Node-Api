const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
const cfg = require('../config.js');
const moment = require('moment');
const saltRounds = 10;

module.exports = (knex, jwt) => {

  router.post("/token", (req, res) => {
    if (req.body.email && req.body.password) {
        var email = req.body.email;
        var password = req.body.password;
        return knex.select('*')
        .from('users')
        .where({
          'email': req.body.email,
        }).then((results) => {
          if (results.length === 1) {
              const user = results[0];
              return bcrypt.compare(password, user.hashed_password).then((response) => {
                var payload = { id: user.id, admin: user.admin };
                var token = jwt.encode(payload, cfg.jwtSecret);
                res.json({ token });
              }).catch((err) => {
                res.sendStatus(401);
              })
          } else {
            res.sendStatus(401);
          }
        });
    } else {
      res.sendStatus(401);
    }
 });

 router.post("/signup", function(req, res) {
   return bcrypt.hash(req.body.password, saltRounds).then(function(hash) {
    knex('users')
    .returning('id')
    .insert({
      'first_name': req.body.first_name,
      'last_name': req.body.last_name,
      'skill_level': req.body.skill_level,
      'email': req.body.email,
      'admin': false,
      'hashed_password': hash,
      'created_at': moment(),
      'updated_at': moment(),
    }).then((results) => {
      var payload = { id: results[0], admin: false };
      var token = jwt.encode(payload, cfg.jwtSecret);
      res.status(200).json({ token });
    });
  });
 })

return router;
}
