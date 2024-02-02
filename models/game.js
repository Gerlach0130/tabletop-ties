// For available games to be searched and interested in

// Import 
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Game extends Model {};

Game.init(
    {
        id: {

        }
    }
);

module.exports = Game;