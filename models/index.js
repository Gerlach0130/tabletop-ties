const User = require('./user');
const Game = require('./game');
const Event = require('./event');

User.hasMany(Game, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasMany(Event, {
  foreignKey: 'user_id'
});

Game.hasMany(Event, {
  foreignKey: 'game_id'
});

Game.belongsTo(User, {
  foreignKey: 'user_id'
});

Event.belongsTo(User, {
  foreignKey: 'user_id'
});

Event.belongsTo(Game, {
  foreignKey: 'game_id'
});

module.exports = { User, Game, Event };