const router = require('express').Router();
const Conversation = require('../models/conversation.model');
const {requireAuth} = require('../middleware/auth.middleware');

router.post('/conversation',requireAuth, async (req, res) => {
    const members = req.body.members;
    const newConversation = new Conversation({ members, friends: members })

    newConversation.save((err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return console.error(err)
        };
        res.status(200).json({
            data: result,
        });
    });
});

router.get('/conversation/:id',requireAuth, async (req, res) => {
    const conversations = await Conversation.find({
        members: {$in:req.params.id}
    });
    res.status(200).json({
        data: conversations,
    });
});

router.delete('/conversation/:id',requireAuth, async (req, res) => {
    const result = await Conversation.findByIdAndRemove({
        _id: req.params.id
    });
    res.status(200).json({
        message: result,
    });
});


module.exports = router
