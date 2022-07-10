const jwt = require('jsonwebtoken');

const requireAuth = (req,res,next) => {
    const token = req.headers.authorization.split(' ')[1];
    if(token) {
        jwt.verify(token,'streamline',(err,decodedToken) => {
            if(err) {
                res.status(400).json({
                    message: 'Not authenticated'
                });
            } else {
                next();
            }
        });
    } 
}

module.exports = { requireAuth }