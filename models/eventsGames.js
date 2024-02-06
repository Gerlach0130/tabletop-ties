// Links Events to Games

// Imports
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class EventsGames extends Model {};

EventsGames.init(
    {
        event_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'event',
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
        modelName: 'eventsGames'
    }
);

module.exports = EventsGames;