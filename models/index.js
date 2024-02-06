const User = require('./user');
const Game = require('./game');
const Event = require('./event');
const UsersGames = require('./usersGames');
const EventsGames = require('./eventsGames');
const UsersEvents = require('./usersEvents');

User.hasMany(Game, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasMany(Event, {
  foreignKey: 'user_id'
});

User.belongsToMany(Game, { through: UsersGames });

User.belongsToMany(Event, { through: UsersEvents });

Game.hasMany(Event, {
  foreignKey: 'game_id'
});

Game.belongsTo(User, {
  foreignKey: 'user_id'
});

Game.belongsToMany(User, {through: UsersGames });

Game.belongsToMany(Event, { through: EventsGames });

Event.belongsTo(User, {
  foreignKey: 'user_id'
});

Event.belongsTo(Game, {
  foreignKey: 'game_id'
});

Event.belongsToMany(User, { through: UsersEvents });

Event.belongsToMany(Game, { through: EventsGames });

module.exports = { User, Game, Event, UsersEvents, UsersGames, EventsGames };