const { Sequelize, DataTypes } = require("sequelize");
const PokemonModel = require("../models/pokemon");
const UserModel = require("../models/user");
const pokemons = require("./mock-pokemon");
const bcrypt = require("bcrypt");

// const sequelize = new Sequelize(
//   "pokedex_shopnestby",
//   "pokedex_shopnestby",
//   "485deb4a5ac2a23296382a86f0dee66534178c32",
//   {
//     host: "mysql://pokedex_shopnestby:485deb4a5ac2a23296382a86f0dee66534178c32@d7f.h.filess.io:3305/pokedex_shopnestby",
//     dialect: "mariadb",
//     dialectOptions: {
//       timezone: "Etc/GMT-2",
//     },
//     logging: true,
//   }
// );
const sequelize = new Sequelize(
  "mysql://pokedex_shopnestby:485deb4a5ac2a23296382a86f0dee66534178c32@d7f.h.filess.io:3305/pokedex_shopnestby"
);

const Pokemon = PokemonModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);

const initDb = () => {
  return sequelize.sync({ force: true }).then((_) => {
    pokemons.map((pokemon) => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types,
      }).then((pokemon) => console.log(pokemon.toJSON()));
    });
    bcrypt
      .hash("pikachu", 10)
      .then((hash) => User.create({ username: "pikachu", password: hash }))
      .then((user) => console.log(user.toJSON()));
    console.log("La base de donnée a bien été initialisée !");
  });
};

module.exports = {
  initDb,
  Pokemon,
  User,
};
