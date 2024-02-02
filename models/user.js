// For user credentials and profile info

// Imports
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    };
};

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8]
            }
        },
        location: {
            type: DataTypes.STRING
        },
        games_played: {
            type: DataTypes.JSON // Store games played as JSON array --- Possibly take out
        },
        gaming_preferences: {
            type: DataTypes.JSON // Store gaming preferences as JSON array --- Possibly take out
        },
        events_attended: {
            type: DataTypes.JSON // Store events attended as JSON array --- Possibly take out
        },
        game_title_interest: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        game_genre_interest: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        hooks: {
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            beforeUpdate: async (updatedUserData) => {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },
        sequelize, 
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);

module.exports = User;