const router = require('express').Router();
const Message = require('../models/message.model');
const {requireAuth} = require('../middleware/auth.middleware');


router.post('/messages',requireAuth, async (req, res) => {
    const { message, senderId,conversationId } = req.body;

    const newMessage = new Message({
        message: message,
        senderId: senderId,
        conversationId:conversationId,
    })

    newMessage.save((err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return console.error(err)
        };
        res.status(200).json({
            data: result,
        });
    });
});

router.get('/messages/:id',requireAuth, async (req, res) => {
    const conversations = await Message.find({
        conversationId:req.params.id
    });
    console.log(conversations);
    res.status(200).json({
        data: conversations,
    });
});



module.exports = router
