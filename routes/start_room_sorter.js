const express = require('express');
const Promise = require('bluebird');
const moment  = require('moment');
const SortedRoom = require('../room_sorter_script/dataParser');
const router  = express.Router();

module.exports = (knex) => {

  router.get('/', (req, res) => {
    const year = moment().year();
    const month = moment().month();
    const day = moment().date();
    const currentDate = moment().year(year).month(month).date(day);
    // TODO the where created_at equals the current date is not working
    // can explain why tomorrow morning, should be fixable, not top priority
    let debater_preferences;
    let rooms;
    let vpi_preference;

    Promise.all([
      knex.select('*').from('rooms'),
      knex.select('*')
        .from('vpi_preferences'),
        // .where({ created_at: currentDate }), // currently not working, can remove this line for demo
      knex.select('*')
        .from('debate_sign_up_preferences'),
        // .where({ created_at: currentDate }), // currently not working, can remove this line for demo
    ]).then((promiseResults) => {
      console.log('what are the promiseResults', promiseResults)
      rooms = promiseResults[0];
      vpi_preference = promiseResults[1];
      debater_preferences = promiseResults[2];
      // return dataParser(rooms, vpi_preference, debater_preferences, knex)
      // .then((sortedRooms) => {
      //
      // })
      // TODO start the room sorter script here and pass in these variables
      // TODO when the room sorter has finished, take the results that the room sorter returns and send them back in the response
      // e.g. sortedRooms = CallToPythonScript(rooms, vpi_preferences, debater_preferences, knex)
      // note that when you call the room sorter script, you need to pass in knex so that you can save items to the database
      res.status(200); // sorted rooms returned from the room sorter script
    })
  });

  return router;
}
