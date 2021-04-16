const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const dotenv = require('dotenv');
dotenv.config();

aws.config.update({
  secretAccessKey: process.env.secretAccessKey,
  accessKeyId: process.env.accessKeyId,
  region: process.env.region,
});

const s3 = new aws.S3();

/* In case you want to validate your file type */
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Wrong file type, only upload JPEG and/or PNG !'), false);
  }
};

const upload = multer({
  fileFilter,
  storage: multerS3({
    acl: 'public-read',
    s3,
    bucket: 'klife',
    key(req, file, cb) {
      /* I'm using Date.now() to make sure my file has a unique name */
      req.file = Date.now() + file.originalname;
      cb(null, Date.now() + file.originalname);
    },
  }),
});

module.exports = upload;
