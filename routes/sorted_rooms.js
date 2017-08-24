const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  router.get('/', (req, res) => {
    knex
      .from('sorted_rooms')
      .then((results) => {
        const promises = results.map((result) => {
          let sortedRoom = {};
          const returnedResult = result;
          sortedRoom.id = returnedResult.id;
          sortedRoom.skill_level = returnedResult.skill_level;
          sortedRoom.room_id = returnedResult.room_id;
          sortedRoom.created_at = returnedResult.created_at;
          sortedRoom.updated_at = returnedResult.updated_at;
          sortedRoom.og = {};
          sortedRoom.oo = {};
          sortedRoom.cg = {};
          sortedRoom.co = {};
          return knex.from('judges')
          .innerJoin('users', 'judges.user_id', 'users.id')
          .where({ 'judges.sorted_room_id': returnedResult.id })
          .then((judges) => {
            sortedRoom.judges = judges;
            return knex.from('users')
            .innerJoin('teams', 'teams.debater_one_id', 'users.id')
            .where({ 'teams.id': returnedResult.og_id })
          }).then((og_debater_one) => {
            sortedRoom.og.debater_one = og_debater_one[0];
            return knex.from('users')
            .innerJoin('teams', 'teams.debater_two_id', 'users.id')
            .where({ 'teams.id': returnedResult.og_id })
          }).then((og_debater_two) => {
            sortedRoom.og.debater_two = og_debater_two[0];
            return knex.from('users')
            .innerJoin('teams', 'teams.debater_one_id', 'users.id')
            .where({ 'teams.id': returnedResult.oo_id })
          }).then((oo_debater_one) => {
            sortedRoom.oo.debater_one = oo_debater_one[0];
            return knex.from('users')
            .innerJoin('teams', 'teams.debater_two_id', 'users.id')
            .where({ 'teams.id': returnedResult.oo_id })
          }).then((oo_debater_two) => {
            sortedRoom.oo.debater_two = oo_debater_two[0];
            return knex.from('users')
            .innerJoin('teams', 'teams.debater_one_id', 'users.id')
            .where({ 'teams.id': returnedResult.cg_id })
          }).then((cg_debater_one) => {
            sortedRoom.cg.debater_one = cg_debater_one[0];
            return knex.from('users')
            .innerJoin('teams', 'teams.debater_two_id', 'users.id')
            .where({ 'teams.id': returnedResult.cg_id })
          }).then((cg_debater_two) => {
            sortedRoom.cg.debater_two = cg_debater_two[0];
            return knex.from('users')
            .innerJoin('teams', 'teams.debater_one_id', 'users.id')
            .where({ 'teams.id': returnedResult.co_id })
          }).then((co_debater_one) => {
            sortedRoom.co.debater_one = co_debater_one[0];
            return knex.from('users')
            .innerJoin('teams', 'teams.debater_two_id', 'users.id')
            .where({ 'teams.id': returnedResult.co_id })
          }).then((co_debater_two) => {
            sortedRoom.co.debater_two = co_debater_two[0];
            return knex.select('*').from('rooms')
            .where({ id: returnedResult.room_id })
          }).then((room) => {
            sortedRoom.room = room[0].name;
            return sortedRoom;
          })
        });
        return Promise.all(promises)
      }).then((sortedResults) => {
        console.log('the results', sortedResults)
        res.status(200).json(sortedResults);
      });
  });

  return router;
}
