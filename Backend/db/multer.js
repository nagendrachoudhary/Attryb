const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination folder where uploaded files will be stored in the 'public' folder.
    cb(null, 'Routes/');
  },
  filename: function (req, file, cb) {
    // Define the filename for the uploaded file. You can customize this as needed.
    // Here, we are using the original filename.
    cb(null, file.originalname);
  },
});

module.exports = multer({
  storage: storage,
  limits: { fileSize: 50000000 },
});