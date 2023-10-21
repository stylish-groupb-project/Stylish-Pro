const connectionPromise = require('../utils/db').connectionPromise;
module.exports = {
    //
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
                const [sizeResult] = await connection.execute(addSizeQuery, [productId, sizes[i]]);
            }
            for (let i = 0; i < variants.length; i++) {
                const addVariantQuery = 'INSERT INTO variant(color_code,size,stock,product_id) VALUES(?,?,?,?)';
                const [variantResult] = await connection.execute(addVariantQuery, [variants[i].color_code, variants[i].size, variants[i].stock, productId]);
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
    getAllProduct: async (res, paging) => {
        const connection = await connectionPromise;
        try {
            //init
            const limit = 6;
            let next_page = null;
            let response


            // operation
            const getAllProductQuery = `
            WITH colorData AS (
                SELECT
                    product_id,
                    JSON_ARRAYAGG(
                        JSON_OBJECT('code', code, 'name', name)
                    ) AS colors
                FROM color
                GROUP BY product_id
            ),
            sizeData AS (
                SELECT
                    product_id,
                    GROUP_CONCAT(size) AS sizes
                FROM product_size
                GROUP BY product_id
            ),
            variantData AS (
                SELECT
                    product_id,
                    JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'color_code', color_code,
                            'size', size,
                            'stock', stock
                        )
                    ) AS variants
                FROM variant
                GROUP BY product_id
            ),
            imageData AS (
                SELECT
                    product_id,
                    GROUP_CONCAT(url) AS urls
                FROM images
                GROUP BY product_id
            ),
            product_with_colors_data AS (
                SELECT P.*, C.colors
                FROM product AS P LEFT JOIN colorData AS C
                ON P.id = C.product_id
                ORDER BY P.id DESC
                LIMIT ${limit+1} OFFSET ${paging * 6}
            ),
            add_sizes_data AS (
                SELECT P.*, S.sizes AS sizes
                FROM product_with_colors_data AS P LEFT JOIN sizeData AS S
                ON P.id = S.product_id
            ),
            add_variant_data AS (
                SELECT P.*, V.variants AS variants
                FROM add_sizes_data AS P LEFT JOIN variantData AS V
                ON P.id = V.product_id
            ),
            add_image_data AS (
                SELECT P.*, I.urls AS images
                FROM add_variant_data AS P LEFT JOIN imageData AS I
                ON P.id = I.product_id
            )
            SELECT * 
            FROM add_image_data
            `;
            const [result] = await connection.execute(getAllProductQuery);
            console.log(result)
            const totalData = result.map((data)=>{
                const sizesArray = data.sizes.split(',');
                const imagesArray = data.images.split(',');
                console.log(sizesArray);
                console.log(imagesArray);
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
                    data: {
                        totalData
                    }
                }
            }else{
                response = {
                    data: {
                        totalData,
                        next_page: next_page
                    }
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