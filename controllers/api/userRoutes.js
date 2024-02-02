// required packages and files
const router = require('express').Router();
const { User } = require('../../models');

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

module.exports = router;