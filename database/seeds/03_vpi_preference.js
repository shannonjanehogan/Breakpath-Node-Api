exports.seed = function(knex, Promise) {
  return knex('vpi_preferences').del()
    .then(function () {
      return Promise.all([
        knex('vpi_preferences').insert({ room_type: 'novice', judgeless_rooms: false }),
      ]);
    });
};
