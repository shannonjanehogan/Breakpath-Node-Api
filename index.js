const PORT        = 8080;
const ENV         = "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const knexLogger  = require('knex-logger');
const app         = express();

app.use(knexLogger(knex));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send('hi');
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
