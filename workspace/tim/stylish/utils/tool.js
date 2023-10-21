const multer = require('multer'); // 引入 multer 套件，用於處理上傳檔案
const path = require('path');
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
        const storage = multer.diskStorage({
            // /home/ubuntu/my-member-system/students/wei-ting/Canchu/static/
            filename: (req, file, cb) => {
                cb(null, `${Date.now()}${path.extname(file.originalname)}`);
            }
        });
        const upload = multer({ storage: multer.memoryStorage });
        return upload;
    },
    uploadToS3: async (file) => {
        const s3Client = new S3Client({
            region: S3_BUCKET_REGION,
            credentials: {
                accessKeyId: AWS_ACCESS_KEY_ID,
                secretAccessKey: AWS_SECRET_ACCESS_KEY,
            },
        });
        const command = new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: file.filename,
            Body: file.buffer,
            ContentType: file.mimetype,
        });
        await s3Client.send(command);
        return `https://${BUCKET_NAME}.s3.${S3_BUCKET_REGION}.amazonaws.com/${file.filename}`;
    }

}