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

User.belongsToMany(Game, {
  through: UsersGames,
  as: 'interested_games',
  foreignKey: 'user_id',
  otherKey: 'game_id'
});

User.belongsToMany(Event, {
  through: UsersEvents,
  as: 'attendees',
  foreignKey: 'user_id',
  otherKey: 'event_id'
});

Game.hasMany(Event, {
  foreignKey: 'game_id'
});

Game.belongsTo(User, {
  foreignKey: 'user_id'
});

Game.belongsToMany(User, {
  through: UsersGames,
  as: 'interested_users',
  foreignKey: 'game_id',
  otherKey: 'user_id'
});

Game.belongsToMany(Event, {
  through: EventsGames,
  as: 'event_games',
  foreignKey: 'game_id',
  otherKey: 'event_id'
});

Event.belongsTo(User, {
  foreignKey: 'user_id'
});

Event.belongsTo(Game, {
  foreignKey: 'game_id'
});

Event.belongsToMany(User, {
  through: UsersEvents,
  as: 'attendees',
  foreignKey: 'event_id',
  otherKey: 'user_id'
});

Event.belongsToMany(Game, {
  through: EventsGames,
  as: 'event_games',
  foreignKey: 'event_id',
  otherKey: 'game_id'
});

module.exports = { User, Game, Event, UsersEvents, UsersGames, EventsGames };