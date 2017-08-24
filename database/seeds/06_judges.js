exports.seed = function(knex, Promise) {
  return knex('judges').del()
    .then(function () {
      return Promise.all([
        knex('judges').insert({ user_id: 9, sorted_room_id: 1 }),
      ]);
    });
};
