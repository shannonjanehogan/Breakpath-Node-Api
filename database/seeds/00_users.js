exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({ admin: false, email: 'sev@hogwarts.com', first_name: 'Severus', last_name: 'Snape', skill_level: 'nov' }),
        knex('users').insert({ admin: true, email: 'sev1@hogwarts.com', first_name: 'Hermione', last_name: 'Granger', skill_level: 'pro' }),
        knex('users').insert({ admin: false, email: 'sev2@hogwarts.com', first_name: 'Ginny', last_name: 'Weasley', skill_level: 'pro' }),
        knex('users').insert({ admin: false, email: 'sev3@hogwarts.com', first_name: 'Lily', last_name: 'Potter', skill_level: 'pro' }),
        knex('users').insert({ admin: false, email: 'sev4@hogwarts.com', first_name: 'James', last_name: 'Potter', skill_level: 'pro' }),
        knex('users').insert({ admin: false, email: 'sev5@hogwarts.com', first_name: 'Fred', last_name: 'Weasley', skill_level: 'nov' }),
        knex('users').insert({ admin: false, email: 'sev6@hogwarts.com', first_name: 'George', last_name: 'Weasley', skill_level: 'nov' }),
        knex('users').insert({ admin: false, email: 'sev7@hogwarts.com', first_name: 'Albus', last_name: 'Dumbledore', skill_level: 'pro' }),
        knex('users').insert({ admin: false, email: 'sev19@hogwarts.com', first_name: 'Godric', last_name: 'Gryffindor', skill_level: 'nov' }),
        knex('users').insert({ admin: false, email: 'sev9@hogwarts.com', first_name: 'Rowena', last_name: 'Ravenclaw', skill_level: 'pro' }),
        knex('users').insert({ admin: false, email: 'sev8@hogwarts.com', first_name: 'Helga', last_name: 'Hufflepuff', skill_level: 'pro' }),
      ]);
    });
};
