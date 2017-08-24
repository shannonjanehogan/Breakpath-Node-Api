const PORT        = 8080;
const ENV         = 'development';
const express     = require('express');
const bodyParser  = require('body-parser');
const knexConfig  = require('./knexfile');
const knex        = require('knex')(knexConfig[ENV]);
const knexLogger  = require('knex-logger');
const app         = express();

// Separated routes for each resource
const sortedRoomsRoutes = require('./routes/sorted_rooms');
const vpiPreferencesRoutes = require('./routes/vpi_preferences');
const debateSignUpRoutes = require('./routes/debate_sign_up');
const startRoomSorterRoutes = require('./routes/start_room_sorter');

app.use(knexLogger(knex));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mount all resource routes
app.use('/api/sorted_rooms', sortedRoomsRoutes(knex));
app.use('/api/vpi_preferences', vpiPreferencesRoutes(knex));
app.use('/api/debate_sign_up', debateSignUpRoutes(knex));
app.use('/api/start_room_sorter', startRoomSorterRoutes(knex));

app.listen(PORT, () => {
  console.log('Example app listening on port ' + PORT);
});
