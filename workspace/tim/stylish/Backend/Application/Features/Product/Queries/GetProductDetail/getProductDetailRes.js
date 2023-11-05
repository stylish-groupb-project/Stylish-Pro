

module.exports = {
    customize: async (result) => {
        let response = null;
        const sizesArray = result[0].sizes.split(',');
        const imagesArray = result[0].images.split(',');
        const totalData = {
            id: result[0].id,
            category: result[0].category,
            title: result[0].title,
            description: result[0].description,
            price: result[0].price,
            texture: result[0].texture,
            wash: result[0].wash,
            place: result[0].place,
            note: result[0].note,
            story: result[0].story,
            colors: result[0].colors,
            sizes: sizesArray,
            variants: result[0].variants,
            main_image: result[0].main_image,
            images: imagesArray
        };
        response = {
            data: totalData
        }
        return response;
    }
}