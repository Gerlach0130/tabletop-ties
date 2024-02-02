// For game events (including relations to user and game)

// Imports
const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/connection');

class Event extends Model {};

Event.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        location: {
            type: DataTypes.STRING
        },
        date_of: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        game_id: {
            type: DataTypes.INTEGER, 
            allowNull: false,
            references: {
                model: 'game',
                key: 'id'
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'event'
    }
);

module.exports = Event;