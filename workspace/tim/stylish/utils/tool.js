module.exports = {
    uploadPicture: () => {
        const storage = multer.diskStorage({
          // /home/ubuntu/my-member-system/students/wei-ting/Canchu/static/
          destination: '/home/ubuntu/campus4/workspace/tim/stylish/static',
          filename: (req, file, cb) => {
            cb(null, `${Date.now()}${path.extname(file.originalname)}`);
          }
        });
        const upload = multer({ storage: storage });
        return upload;
      }
}