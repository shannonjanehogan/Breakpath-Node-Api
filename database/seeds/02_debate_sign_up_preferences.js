exports.seed = function(knex, Promise) {
  return knex('debate_sign_up_preferences').del()
    .then(function () {
      return Promise.all([
        knex('debate_sign_up_preferences').insert({ name: 'Severus Snape', debater_preference: 'debate', partner_preference: 'Lily Potter' }),
        knex('debate_sign_up_preferences').insert({ name: 'Ginny Weasley', debater_preference: 'debate' }),
        knex('debate_sign_up_preferences').insert({ name: 'Harry Potter', debater_preference: 'debate_or_judge', partner_preference: 'Albus Dumbledore' }),
        knex('debate_sign_up_preferences').insert({ name: 'Albus Dumbledore', debater_preference: 'debate', partner_preference: 'Harry Potter' }),
        knex('debate_sign_up_preferences').insert({ name: 'Lily Potter', debater_preference: 'debate', partner_preference: 'Severus Snape' }),
        knex('debate_sign_up_preferences').insert({ name: 'George Weasley', debater_preference: 'debate' }),
        knex('debate_sign_up_preferences').insert({ name: 'Fred Weasley', debater_preference: 'debate_or_judge' }),
        knex('debate_sign_up_preferences').insert({ name: 'Godric Gryffindor', debater_preference: 'debate_or_judge' }),
        knex('debate_sign_up_preferences').insert({ name: 'Rowena Ravenclaw', debater_preference: 'judge' }),
        knex('debate_sign_up_preferences').insert({ name: 'Hermione Granger', debater_preference: 'debate' }),
      ]);
    });
};
