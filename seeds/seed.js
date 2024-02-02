// required packages and files 
const sequelize = require('../config/connection');
const {User, } = require('../models');
const userData = require('./userData.json');
// add additional packages or files as needed
// line 3 add additional model names as needed 

const seedDatabase = async () => {
    await sequelize.sync({force: true});
    const users = await User.bulkCreat(userData, {
        individualHooks: true,
        returning: true,
    });
    // add model name to the following lines
    for (const  of    ) {
        await .create({
            ...  ,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }
    process.exit(0);
};

seedDatabase();