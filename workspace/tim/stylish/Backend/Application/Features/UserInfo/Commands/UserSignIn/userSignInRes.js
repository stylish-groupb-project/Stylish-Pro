module.exports = {
    customize: async(userData,accessTokenInfoObj)=>{
        const response = {
            data: {
                access_token: accessTokenInfoObj.token,
                access_expired: accessTokenInfoObj.expire,
                user: {
                    id: userData[0].id,
                    provider: userData[0].provider,
                    name: userData[0].name,
                    email: userData[0].email,
                    picture: userData[0].picture
                }
            }
        };
        return response;
    }
}