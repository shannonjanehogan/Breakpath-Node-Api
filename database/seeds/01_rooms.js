exports.seed = function(knex, Promise) {
  return knex('rooms').del()
    .then(function () {
      return Promise.all([
        knex('rooms').insert({ name: 'Buch B302' }),
      ]);
    });
};
