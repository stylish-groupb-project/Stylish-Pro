const connectionPromise = require('../utils/db').connectionPromise;
module.exports = {
    addProduct: async (res, data, filenames) => {
        const connection = await connectionPromise;
        const datas = JSON.parse(data);
        try {
            const { category, title, description, price, texture, wash, place, note, story, colors, sizes, variants } = datas;
            const baseUrl = 'http://13.55.47.107';
            const main_img = `${baseUrl}/static/${filenames[0]}`;
            console.log(main_img);
            const addProductQuery = 'INSERT INTO product(category,title,description,price,texture, wash, place, note, story ,main_image) VALUES(?,?,?,?,?,?,?,?,?,?)';
            console.log(`${data}`);
            console.log(category);
            const [results] = await connection.execute(addProductQuery, [category, title, description, price, texture, wash, place, note, story, main_img]);
            const productId = results.insertId;
            for (let i = 0; i < colors.length; i++) {
                const addColorQuery = 'INSERT INTO color(name,code,product_id) VALUES(?,?,?)';
                const [colorResult] = await connection.execute(addColorQuery, [colors[i].name, colors[i].code, productId]);
            }
            for (let i = 0; i < sizes.length; i++) {
                const addSizeQuery = 'INSERT INTO product_size(product_id,size) VALUES(?,?)';
                const [sizeResult] = await connection.execute(addSizeQuery, [productId,sizes[i].size]);
            }
            for (let i = 0; i < variants.length; i++) {
                const addVariantQuery = 'INSERT INTO variant(color_code,size,stock,product_id) VALUES(?,?,?,?)';
                const [variantResult] = await connection.execute(addVariantQuery, [variants[i].color_code,variants[i].size,variants[i].stock,productId]);
            }
            const response = {
                data: {
                    product: productId
                }
            };
            return response;

        } catch (error) {
            console.error(error);
        }
        finally {
            console.log('connection release');
        }
    }


}