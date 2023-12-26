
module.exports = {
    customize: async (result) => {
        let response = null;
        const totalData = {
            id: result[0].id,
            title: result[0].title,
            description: result[0].description,
            texture: result[0].texture,
            place: result[0].place,
            main_image: result[0].main_image
        };
        response = {
            data: totalData
        }
        return response;
    }
}