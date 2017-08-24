exports.seed = function(knex, Promise) {
  return knex('sorted_rooms').del()
    .then(function () {
      return Promise.all([
        knex('sorted_rooms').insert({ og_id: 1, oo_id: 4, cg_id: 2, co_id: 3, skill_level: 'proam', room_id: 1 }),
      ]);
    });
};
