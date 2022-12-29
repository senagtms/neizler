const multer  = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/');
    },
    filename: (req, file, cb) => {
        const ms = new Date().getTime().toString();
        const fileName = ms + '-' + file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName)
    }
});
const upload = multer({
    storage,
    fileFilter:  (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            req.fileError = 'Only .png, .jpg and .jpeg format allowed!';
            //return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

module.exports = upload;