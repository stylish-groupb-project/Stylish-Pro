module.exports = {
    customize: async (result, limit,paging) => {
        let next_page = null;
        let response = null;
        const totalData = [];
        for (let i = 0; i < result.length - 1; i++) {
            //要多判斷image是否為空 TODO: add error message
            const sizesArray = result[i].sizes.split(',');
            const imagesArray = result[i].images.split(',');
            let res = {
                id: result[i].id,
                category: result[i].category,
                title: result[i].title,
                description: result[i].description,
                price: result[i].price,
                texture: result[i].texture,
                wash: result[i].wash,
                place: result[i].place,
                note: result[i].note,
                story: result[i].story,
                colors: result[i].colors,
                sizes: sizesArray,
                variants: result[i].variants,
                main_image: result[i].main_image,
                images: imagesArray
            };
            totalData.push(res);
        }
        if (result.length > limit) {
            next_page = paging
            next_page++;
        }
        if (next_page === null) {
            response = {
                data: totalData
            }
        } else {
            response = {
                data: totalData,
                next_paging: next_page
            }
        }
        return response;
    }
}