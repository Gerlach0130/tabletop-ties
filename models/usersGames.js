// Links Users to Games

// Imports
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UsersGames extends Model {};

UsersGames.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        game_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'game',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'usersGames'
    }
);

// Export
module.exports = UsersGames;