// required packages and files
const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');

// post route to update when user is created
router.post('/', async (req, res) => {
    try {
        const userData = await User.creat(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// post route for user registration
router.post('/signup', async (req, res) => {
    try {
        const newUser = await User.create({
            ...req.body
        });
        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.logged_in = true;

            req.status(200).json(newUser);
        });
    } catch (error) {
        res.status(400).json(error);
    }
});

// post route for handling login requests
router.post ('/login', async (req, res) => {
    try {
        const userData = await User.findOne({where: {email:req.body.email}});
        if (!userData) {
            res.status(400).json({message: 'Incorrect user email or password. Please try again '});
            return;
        }
        const validPassword = await userData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({message: 'Incorrect user email or password. Please try again'});
            return; 
        }
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.json({ user: userData, message: 'Login success!'});
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// post route to handle logout requests
router.post('/logout', (req,res) => {
    if (req.session.logged_in){
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

// GET route for profile 'matching'
// router.get('/match', withAuth, async (req, res) => {
//     try {
//         const currentUser = await User.findByPk(req.session.user_id, {
//             include: [{ model: Game, as: 'game_title_interest'}]
//         });
//         const matchedUsers = await User.findAll({
//             include: [{
//                 model: Game,
//                 as: 'game_title_interest',
//                 where: {
//                     id: currentUser.game_title_interest.map(game => game.id)
//                 }
//             }]
//         });
//         res.status(200).json(matchedUsers);
//     } catch (error) {
//         res.status(500).json(error);
//     }
// });

module.exports = router;