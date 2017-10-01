exports.up = (knex, Promise) => Promise.all([
  knex.schema.createTableIfNotExists('users', (table) => {
    table.increments('id').primary().notNullable();
    table.string('first_name');
    table.string('last_name');
    table.string('username');
    table.string('hashed_password');
    table.string('email');
    table.string('skill_level');
    table.boolean('admin');
    table.timestamps();
  }),
  knex.schema.createTableIfNotExists('rooms', (table) => {
    table.increments('id').primary().notNullable();
    table.string('name');
    table.timestamps();
  }),
  knex.schema.createTableIfNotExists('teams', (table) => {
    table.increments('id').primary().notNullable();
    table.integer('debater_one_id');
    table.foreign('debater_one_id').references('users.id');
    table.integer('debater_two_id');
    table.foreign('debater_two_id').references('users.id');
    table.string('skill_level');
    table.timestamps();
  }),
  knex.schema.createTableIfNotExists('sorted_rooms', (table) => {
    table.increments('id').primary().notNullable();
    table.integer('og_id');
    table.foreign('og_id').references('teams.id');
    table.integer('oo_id');
    table.foreign('oo_id').references('teams.id');
    table.integer('cg_id');
    table.foreign('cg_id').references('teams.id');
    table.integer('co_id');
    table.foreign('co_id').references('teams.id');
    table.integer('room_id');
    table.foreign('room_id').references('rooms.id');
    table.string('skill_level');
    table.timestamps();
  }),
  knex.schema.createTableIfNotExists('vpi_preferences', (table) => {
    table.increments('id').primary().notNullable();
    table.boolean('judgeless_rooms');
    table.string('room_type'); // overall room skill level
    table.timestamps();
  }),
  knex.schema.createTableIfNotExists('debate_sign_up_preferences', (table) => {
    table.increments('id').primary().notNullable();
    table.integer('user_id');
    table.foreign('user_id').references('users.id');
    table.string('name');
    table.string('debater_preference');
    table.string('partner_preference');
    table.integer('partner_preference_id');
    table.foreign('partner_preference_id').references('users.id');
    table.timestamps();
  }),
  knex.schema.createTableIfNotExists('judges', (table) => {
    table.increments('id').primary().notNullable();
    table.integer('user_id');
    table.foreign('user_id').references('users.id');
    table.integer('sorted_room_id');
    table.foreign('sorted_room_id').references('sorted_rooms.id');
    table.timestamps();
  }),
]);

exports.down = (knex, Promise) => Promise.all([
  knex.schema.dropTable('judges'),
  knex.schema.dropTable('debate_sign_up_preferences'),
  knex.schema.dropTable('vpi_preferences'),
  knex.schema.dropTable('sorted_rooms'),
  knex.schema.dropTable('teams'),
  knex.schema.dropTable('rooms'),
  knex.schema.dropTable('users'),
]);
