const router = require('express').Router();
const ClientModel = require('../models/client.model');

router.post('/login', (req,res) => {
    res.status(200).json({
        isLogin:true
    });
});

router.post('/register', async (req,res) => {
    let newClient = new ClientModel({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        username:req.body.username,
        password:req.body.password
    })

    newClient.save((err,result) => {
        if(err) return console.error(err);
        
        res.status(200).json({
            data:result
        });
    })
});

module.exports = router