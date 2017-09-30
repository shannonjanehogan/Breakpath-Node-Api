const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
const cfg = require("../config.js");
const moment = require('moment');
const saltRounds = 10;

module.exports = (knex, jwt) => {

  router.post("/token", function(req, res) {
    if (req.body.email && req.body.password) {
        var email = req.body.email;
        var password = req.body.password;
        return knex.select('*')
        .from('users')
        .where({
          'email': req.body.email,
        }).then((results) => {
          if (results.length === 1) {
              const user = results[0]
              return bcrypt.compare(password, user.hashed_password).then(function(res) {
                var payload = { id: user.id };
                var token = jwt.encode(payload, cfg.jwtSecret);
                console.log('what is the token', token)
                res.json({ token: token });
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
   console.log('what is the password', req.body.password)
   console.log('what is the req body', req.body)
   return bcrypt.hash(req.body.password, saltRounds).then(function(hash) {
    knex('users')
    .returning('id')
    .insert({
      'first_name': req.body.first_name,
      'last_name': req.body.last_name,
      'skill_level': req.body.skill_level,
      'email': req.body.email,
      'hashed_password': hash,
      'created_at': moment(),
      'updated_at': moment(),
    }).then((results) => {
      console.log('what is the result', results[0])
      var payload = { id: results[0] };
      var token = jwt.encode(payload, cfg.jwtSecret);
      console.log('what is the token', token)
      res.status(200).json({ token: "hi" });
    });
  });
 })

return router;
}
