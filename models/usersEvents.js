// Links which Users are attending which Events

// Imports
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UsersEvents extends Model {};

UsersEvents.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        event_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'event',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'usersEvents'
    }
);

// Export
module.exports = UsersEvents;
