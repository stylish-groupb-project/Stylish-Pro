const multer = require('multer'); // 引入 multer 套件，用於處理上傳檔案
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const https = require('https');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
require('dotenv').config();
const {
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    S3_BUCKET_REGION,
    BUCKET_NAME,
} = process.env;

module.exports = {
    uploadPicture: () => {
        // const storage = multer.diskStorage({
        //     // /home/ubuntu/my-member-system/students/wei-ting/Canchu/static/
        //     filename: (req, file, cb) => {
        //         cb(null, `${Date.now()}${path.extname(file.originalname)}`);
        //     }
        // });
        //TODO: 驗證副檔名、限制檔案大小
        const upload = multer({
            storage: multer.memoryStorage(),
        });
        return upload;
    },
    /**
     * upload the file from client to the S3
     * @param {Object} file - The file from client
     * @returns {string}
     */
    uploadToS3: async (file) => {
        const key = Date.now().toString() + '-' + file.originalname;
        const s3Client = new S3Client({
            region: S3_BUCKET_REGION,
            credentials: {
                accessKeyId: AWS_ACCESS_KEY_ID,
                secretAccessKey: AWS_SECRET_ACCESS_KEY,
            },
        });
        const command = new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
        });
        await s3Client.send(command);
        return `https://${BUCKET_NAME}.s3.${S3_BUCKET_REGION}.amazonaws.com/${key}`;
    },
    checkEmail: async (email) => {
        const emailRegex = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
        return emailRegex.test(email);
    },
    generateHashPassword: async (password) => {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    },
    /**
     * check the input password
     * @param {string} input - The input password from client
     * @param {Object} real - The hashed password in db
     * @returns {boolean}
     */
    confirmPassword: async (input, real) => {
        return bcrypt.compare(input, real);
    },
    tappayRequest: async(post_options,post_data)=>{
        let tappayStatus = false;
        const post_req = https.request(post_options, function (response) {
            response.setEncoding('utf8');
            response.on('data', function (body) {
                let tapPayResponse = JSON.parse(body);
                console.log(tapPayResponse.msg);
                console.log(tapPayResponse.status);
                if(tapPayResponse.msg == 'Success'){
                    tappayStatus = true;
                    console.log("tool:"+tappayStatus);
                    return tappayStatus;
                }
                // console.log(tapPayResponse);
                // return res.json({
                //     result: JSON.parse(body)
                // })
            });
        });
        post_req.write(JSON.stringify(post_data));
        post_req.end();
    }



}