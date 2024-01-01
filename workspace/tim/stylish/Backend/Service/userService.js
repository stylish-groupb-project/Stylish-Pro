// Service layer (負責關於資料庫相關的邏輯處理)
const userRepo = require('../Repository/userRepo');
const roleRepo = require('../Repository/roleRepo');
const errorMsg = require('../utils/error');
const connectionPromise = require('../utils/db').connectionPromise;
module.exports = {
    signUp: async (res, userIfoObj) => {
        const connection = await connectionPromise.getConnection();
        try {
            //transaction 
            const checkResult = await userRepo.selectUserByEmail(res, userIfoObj.email);
            if (checkResult.length > 0) {
                return errorMsg.emailExist(res);
            }

            await connection.beginTransaction();
            const insertResult = await userRepo.insertNewUser(res, userIfoObj, connection);
            await roleRepo.addRoleToUser(res, 2 , insertResult.insertId , connection);
            await connection.commit();

            return insertResult;

        } catch (error) {
            await connection.rollback();
            console.error(error);
            errorMsg.query(res);
        } finally {
            console.log('connection release');
            connection.release();
        }

    },
    signIn: async (res, email) => {
        const result = await userRepo.selectUserByEmail(res, email);
        if (result.length === 0) {
            return errorMsg.noUser(res);
        }
        return result;
    },
    signInWithGoogle: async (res, userInfo) => {
        const result = await userRepo.selectUserByEmail(res, userInfo.email);
        if (result.length === 0) {
            const connection = await connectionPromise.getConnection();
            try {
                await connection.beginTransaction();
                const insertResult = await userRepo.insertNewUser(res, userInfo, connection);
                await roleRepo.addRoleToUser(res, 2 , insertResult.insertId , connection);
                await connection.commit();
                const result = await userRepo.selectUserById(res, insertResult.insertId);
                return result;
            } catch (error) {
                await connection.rollback();
                console.error(error);
                errorMsg.query(res);
            } finally {
                console.log('connection release');
                connection.release();
            }
        }
        return result;
    },
    signInWithLine: async (res, email) => {
        const result = await userRepo.selectUserByEmail(res, email);
        if (result.length === 0) {
            const connection = await connectionPromise.getConnection();
            try {
                await connection.beginTransaction();
                const insertResult = await userRepo.insertNewUser(res, userIfoObj, connection);
                await roleRepo.addRoleToUser(res, 2 , insertResult.insertId , connection);
                await connection.commit();
                return insertResult;
            } catch (error) {
                await connection.rollback();
                console.error(error);
                errorMsg.query(res);
            } finally {
                console.log('connection release');
                connection.release();
            }
        }
        return result;
    },
    getProfile: async (res, userId) => {
        const result = await userRepo.selectUserById(res, userId);
        if (result.length === 0) {
            return errorMsg.noUser(res);
        }
        return result;
    },
    resetPassword: async (res, userId, newPassword) => {
        const result = await userRepo.resetUserPassword(res, userId, newPassword);
        if (result.affectedRows === 0) {
            return errorMsg.noUser(res);
        }
        return result;
    },
    createUserResetToken: async (res, userId, userInfoObj) => {
        console.log("createUserResetToken");
        const result = await userRepo.createUserResetToken(res, userId, userInfoObj);
        if (result.affectedRows === 0) {
            return errorMsg.noUser(res);
        }
        return result;
    },
    updateUserResetToken: async (res, userId, userInfoObj) => {
        console.log("updateUserResetToken");
        const result = await userRepo.updateUserResetToken(res, userId, userInfoObj);
        if (result.affectedRows === 0) {
            return errorMsg.noUser(res);
        }
        return result;
    },
    deleteUserResetToken: async (res, userId) => {
        console.log("deleteUserResetToken");
        const result = await userRepo.deleteUserResetToken(res, userId);
        if (result.affectedRows === 0) {
            return errorMsg.noUser(res);
        }
        return result;
    },
    selectUserByResetToken: async (res, resetToken) => {
        console.log("selectUserByResetToken");
        console.log(resetToken);
        const result = await userRepo.selectUserByResetToken(res, resetToken);
        console.log(result);
        if (result.length === 0) {
            return errorMsg.noUser(res);
        }
        return result;
    },
}