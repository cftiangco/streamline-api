const router = require('express').Router();
const Client = require('../models/client.model');
const jwt = require('jsonwebtoken');
const {requireAuth} = require('../middleware/auth.middleware');

const MAX_AGE = 3 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({ id }, 'streamline', {
        expiresIn: MAX_AGE
    });
}

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const result = await Client.login(username,password);
        const token = createToken(result._id);
        res.status(200)
        .json({
            data:result,
            token
        });
    } catch (err) {
        res.status(400)
        .json({err:err.message})
    }
});

router.post('/register', async (req, res) => {
    const newClient = new Client({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password
    })

    newClient.save((err, result) => {
        if (err) {
            res.status(400).json({error:err.message});
            return console.error(err)
        };
        const token = createToken(result._id);
        res.status(200).json({
            data: result,
            token
        });
    });

});

router.get('/clients',requireAuth,async (req, res) => {
    Client.find({}, (err, result) => {
        if (err) return console.error(err);
        res.status(201).json({
            data: result
        });
    });
});

module.exports = router