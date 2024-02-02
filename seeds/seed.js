// required packages and files 
const sequelize = require('../config/connection');
const {User, Game, Event } = require('../models');
const userData = require('./userData.json');
const gameData = require('./gameData.json');
const eventData = require('./eventData.json'); 

const seedDatabase = async () => {
    try { await sequelize.sync({force: true});
        const users = await User.bulkCreat(userData, {
        individualHooks: true,
        returning: true,
        });
        const games = await Game.bulkCreate(gameData);
        for (const event of eventData) {
            await Event.create({
                ...event,
                user_id: users[Math.floor(Math.random() * users.lenth)].id,
                game_id: games[Math.floor(Math.random() * games.lenght)].id,
            });
        }
        console.log('Database seeded successfully.');
    } catch (err) {
        console.error('Error seeding database: ', err);
    } finally {
        await sequelize.close();
        process.exit(0);
    }
};

seedDatabase();