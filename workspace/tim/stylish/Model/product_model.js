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
    getProduct: async (res, type, paging) => {
        const connection = await connectionPromise;
        try {
            //init
            const limit = 6;
            let next_page = null;
            let response = null;

            // operation
            const sql_condition_obj = {
                detail: null,
                searchkeyword: null,
                filter: type,
            }
            const getProductQuery = await sql_view.getProducts(sql_condition_obj, limit, paging);
            console.log(getProductQuery);
            const [result] = await connection.execute(getProductQuery);
            console.log("result.length: " + result.length);
            const totalData = [];
            for (let i = 0; i < result.length - 1; i++) {
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
                next_page = paging + 1;
            }
            if (next_page === null) {
                response = {
                    data: totalData
                }
            } else {
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
    },
    search: async (res, keyword, paging) => {
        const connection = await connectionPromise;
        try {
            //init
            const limit = 6;
            let next_page = null;
            let response = null;

            //operation
            const sql_condition_obj = {
                detail: null,
                searchkeyword: keyword,
                filter: "all",
            }
            const searchQuery = await sql_view.getProducts(sql_condition_obj, limit, paging);
            console.log(searchQuery);
            const [result] = await connection.execute(searchQuery);
            const totalData = [];
            for (let i = 0; i < result.length - 1; i++) {
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
                    main_image: result[i].main_image,
                    images: imagesArray,
                    variants: result[i].variants,
                    colors: result[i].colors,
                    sizes: sizesArray
                };
                totalData.push(res);
            }
            if (result.length > limit) {
                next_page = paging + 1;
            }
            if (next_page === null) {
                response = {
                    data: totalData
                }
            } else {
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
    },
    getProductDetail: async (res, product_id) => {
        const connection = await connectionPromise;
        try {
            //init
            const limit = 0;
            let response = null;

            //operation
            const sql_condition_obj = {
                detail: product_id,
                searchkeyword: null,
                filter: null
            }
            const searchQuery = await sql_view.getProducts(sql_condition_obj, limit, 0);
            console.log(searchQuery);
            const [result] = await connection.execute(searchQuery);
            if (result.length == 0) return res.status(403).json("product doesn't exist");
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

        } catch (error) {
            console.error(error);
        }
        finally {
            console.log('connection release');
        }

    }


}