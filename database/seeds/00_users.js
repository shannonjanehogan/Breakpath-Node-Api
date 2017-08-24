exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({ id: 1, first_name: 'Severus', last_name: 'Snape', skill_level: 'nov' }),
        knex('users').insert({ id: 2, first_name: 'Hermione', last_name: 'Granger', skill_level: 'pro' }),
        knex('users').insert({ id: 3, first_name: 'Ginny', last_name: 'Weasley', skill_level: 'pro' }),
        knex('users').insert({ id: 4, first_name: 'Lily', last_name: 'Potter', skill_level: 'pro' }),
        knex('users').insert({ id: 5, first_name: 'Fred', last_name: 'Weasley', skill_level: 'nov' }),
        knex('users').insert({ id: 6, first_name: 'George', last_name: 'Weasley', skill_level: 'nov' }),
        knex('users').insert({ id: 7, first_name: 'Albus', last_name: 'Dumbledore', skill_level: 'pro' }),
        knex('users').insert({ id: 8, first_name: 'Godric', last_name: 'Gryffindor', skill_level: 'nov' }),
        knex('users').insert({ id: 9, first_name: 'Rowena', last_name: 'Ravenclaw', skill_level: 'pro' }),
        knex('users').insert({ id: 10, first_name: 'Helga', last_name: 'Hufflepuff', skill_level: 'pro' }),
      ]);
    });
};
