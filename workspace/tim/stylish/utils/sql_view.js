module.exports = {
    getProducts: async(sql_condition_obj,limit,paging)=>{
        //init
        let insert =null;

        //operation
        //detail is to store the target prodoct detail id
        
        const {searchKeyword,filter,detail} = sql_condition_obj;
        console.log(searchKeyword);
        if(searchKeyword!==null){
            insert = `WHERE P.title like '%${searchKeyword}%'`;
        }
        if(filter !== "all" || filter !== null){
            insert = `WHERE P.category = '${filter}'`;
        }
        if(detail!==null){
            insert = `WHERE P.id = ${detail}`;
        }

        let getAllProductQuery = `
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
                ${insert === null ? '':insert}
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
        return getAllProductQuery;
    },
    searchByTitle: async(keyword)=>{

    }
}