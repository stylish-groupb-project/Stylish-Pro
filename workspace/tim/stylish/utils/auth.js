const jwt = require('jsonwebtoken');
const errorMsg = require('./error');
const roleService = require('../Service/roleService');
require('dotenv').config();
module.exports = {
    generateAccessToken: async (userId) => {
        const secretKey = process.env.SECRET;
        const payload = { id: userId };
        //console.log(payload);
        const token = jwt.sign(payload, secretKey, { expiresIn: '24h' });
        const tokenInfo = {
            token: token,
            expire: `${60 * 60 * 24}`
        };
        return tokenInfo;
    },
    // Middleware for verifying JWT token
    verifyToken: async (req, res, next) => {
        const token = req.headers.authorization;
        console.log(token);
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
    },
    authorize: async (requiredRole) => {
        return (req, res, next) => {
            try {
                const loginUserId = req.decodedToken.id;
                const roles = roleService.checkRole(res, loginUserId);
                if (roles.length === 0) return errorMsg.roleProblem(res);
                const flag = roles.some((role) => role.name == requiredRole);
                // let flag = false;
                // console.log(roles[0].name);
                // roles.forEach((role) => {
                //     if (role.name == requiredRole) {
                //         flag = true;
                //     }
                // });
                if (flag) {
                    next();
                } else {
                    errorMsg.permissionDenied(res);
                }
            } catch (error) {
                console.error(error);
            }

        }
    }
    // authorize: async (req, res, next)=>{
    //     const loginUserId = req.decodedToken.id;
    //     const roles = await roleService.checkRole(res,loginUserId);
    //     if(roles.length === 0) return errorMsg.roleProblem(res);
    //     roles.map((role)=>{

    //     })

    // }


}