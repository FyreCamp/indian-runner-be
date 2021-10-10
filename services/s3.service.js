import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";

const s3 = new aws.S3();

export const uploadProfilePic = multer({
  storage: multerS3({
    s3: s3,
    bucket: "indian-runner",
    key: function (req, file, cb) {
      cb(null, `profile_pics/${file.fieldname}-${Date.now()}`); //use Date.now() for unique file keys
    },
  }),
});
