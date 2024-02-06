// required packages and files 
const sequelize = require('../config/connection');
const { User, Game, Event } = require('../models');
const userData = require('./userData.json');
const gameData = require('./gameData.json');
const eventData = require('./eventData.json'); 

const seedDatabase = async () => {
    try { await sequelize.sync({ force: true });
        const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
        });
        const games = [];
        for (const gameInfo of gameData) {
            const { user_ids, ...gameAttributes } = gameInfo;
            const createdGames= await Game.bulkCreate([gameAttributes]);
            for (const user_id of user_ids) {
                const game = createdGames[0];
                await game.addUser(user_id);
            }
            games.push(...createdGames);
        }
        for (const event of eventData) {
            await Event.create({
                ...event,
                user_id: users[Math.floor(Math.random() * users.length)].id,
                game_id: games[Math.floor(Math.random() * games.length)].id,
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