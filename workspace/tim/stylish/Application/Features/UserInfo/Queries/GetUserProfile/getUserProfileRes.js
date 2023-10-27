module.exports = {
    customize: async (userData) => {
        const response = {
            data: {
                provider: userData[0].provider,
                name: userData[0].name,
                email: userData[0].email,
                picture: userData[0].picture
            }
        };
        return response;
    }
}