exports.seed = function(knex, Promise) {
  return knex('teams').del()
    .then(function () {
      return Promise.all([
        knex('teams').insert({ id: 1, debater_one_id: 1, debater_two_id: 4, skill_level: 'proam' }),
        knex('teams').insert({ id: 2, debater_one_id: 2, debater_two_id: 3, skill_level: 'pro' }),
        knex('teams').insert({ id: 3, debater_one_id: 5, debater_two_id: 6, skill_level: 'nov' }),
        knex('teams').insert({ id: 4, debater_one_id: 7, debater_two_id: 8, skill_level: 'nov' }),
      ]);
    });
};
