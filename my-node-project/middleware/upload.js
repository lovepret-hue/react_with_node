const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname); // 👉 gets extension like .jpg, .png
    cb(null, uniqueSuffix + ext); // 👈 saves with extension
  }
});

const upload = multer({ storage });
module.exports = upload;