const jwt = require('jsonwebtoken');
const errorMsg = require('./error');
require('dotenv').config();
module.exports = {
    generateAccessToken: async (userId) => {
        const secretKey = process.env.SECRET;
        const payload = { id: userId };
        //console.log(payload);
        const token = jwt.sign(payload, secretKey, { expiresIn: '24h' });
        return token;
    },
    // Middleware for verifying JWT token
    verifyToken: async (req, res, next) => {
        const token = req.headers.authorization;
        try {
            if (!token) {
                return errorMsg.noToken(res);
            }
            const pureToken = token.split(' ')[1];
            const decodedToken = jwt.verify(pureToken, process.env.SECRET);
            req.decodedToken = decodedToken;
            next();
        } catch (error) {
            console.error(error);
            return errorMsg.wrongToken(res);
        }
    }


}