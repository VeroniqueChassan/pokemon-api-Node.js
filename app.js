const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const sequelize = require("./src/db/sequelize");

const app = express();
const port = 3000;

app
  .use(favicon(__dirname + "/favicon.ico"))
  .use(morgan("dev"))
  .use(bodyParser.json());

sequelize.initDb();

//ici nous placerons nos futur points de terminaison
require("./src/routes/findAllPokemons")(app);
require("./src/routes/findPokemonsByPk")(app);
require("./src/routes/createPokemon")(app);
require("./src/routes/updatePokemon")(app);
require("./src/routes/deletePokemon")(app);
require("./src/routes/login")(app);

//on ajoute la gestion des erreurs 404
app.use(({ res }) => {
  const message =
    "impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL";
  res.status(404).json({ message });
});
app.listen(port, () =>
  console.log(
    `Notre application Node est désormée sur : http://localhost:${port}`
  )
);

//vidéo 07:19:17
//https://www.youtube.com/watch?v=NRxzvpdduvQ&t=4474s
//simon Dieny

//DOC PIERRE P57

//DB is place in the cloud =  FILESS.IO
// https://dash.filess.io/#/app/databases/2d95f918-9ae1-4054-9be6-53cc091a0c00
