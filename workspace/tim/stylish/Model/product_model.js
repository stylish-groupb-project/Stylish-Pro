const connectionPromise = require('../utils/db').connectionPromise;
const sql_view = require('../utils/sql_view');
module.exports = {
    addProduct: async (res, data, filenames) => {
        const connection = await connectionPromise;
        const data_json = JSON.parse(data);
        try {
            const { category, title, description, price, texture, wash, place, note, story, colors, sizes, variants } = data_json;
            const baseUrl = 'http://13.55.47.107/static';
            const main_img = `${baseUrl}/${filenames[0]}`;
            const addProductQuery = 'INSERT INTO product(category,title,description,price,texture, wash, place, note, story ,main_image) VALUES(?,?,?,?,?,?,?,?,?,?)';
            console.log(category);
            const [results] = await connection.execute(addProductQuery, [category, title, description, price, texture, wash, place, note, story, main_img]);
            const productId = results.insertId;
            for (let i = 0; i < colors.length; i++) {
                const addColorQuery = 'INSERT INTO color(name,code,product_id) VALUES(?,?,?)';
                const [colorResult] = await connection.execute(addColorQuery, [colors[i].name, colors[i].code, productId]);
            }
            for (let i = 0; i < sizes.length; i++) {
                const addSizeQuery = 'INSERT INTO product_size(product_id,size) VALUES(?,?)';
                const [sizeResult] = await connection.execute(addSizeQuery, [productId, sizes[i]]);
            }
            for (let i = 0; i < variants.length; i++) {
                const addVariantQuery = 'INSERT INTO variant(color_code,size,stock,product_id) VALUES(?,?,?,?)';
                const [variantResult] = await connection.execute(addVariantQuery, [variants[i].color_code, variants[i].size, variants[i].stock, productId]);
            }
            for (let i = 1; i < filenames.length; i++) {
                const addImageQuery = 'INSERT INTO images(url,product_id) VALUES(?,?)';
                const [imageResult] = await connection.execute(addImageQuery, [`${baseUrl}/${filenames[i]}`, productId]);
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
    },
    getProduct: async (res, type ,paging) => {
        const connection = await connectionPromise;
        try {
            //init
            const limit = 6;
            let next_page = null;
            let response =null;

            // operation
            const getAllProductQuery = await sql_view.getProducts(type,limit,paging);
            const [result] = await connection.execute(getAllProductQuery);
            const totalData = result.map((data)=>{
                const sizesArray = data.sizes.split(',');
                const imagesArray = data.images.split(',');
                return {
                    id: data.id,
                    category: data.category,
                    title: data.title,
                    description: data.description,
                    price: data.price,
                    texture: data.texture,
                    wash: data.wash,
                    place: data.place,
                    note: data.note,
                    story: data.story,
                    colors: data.colors,
                    sizes: sizesArray,
                    variants: data.variants,
                    main_image: data.main_image,
                    images: imagesArray
                }
            });
            console.log(totalData);
            if(result.length>limit){
                next_page = paging + 1;
            }
            if(next_page === null){
                response = {
                    data: totalData
                }
            }else{
                response = {
                    data: totalData,
                    next_page: next_page
                }
            }
            return response;
        } catch (error) {
            console.error(error);
        }
        finally {
            console.log('connection release');
        }
    }


}