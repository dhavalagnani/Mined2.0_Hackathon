require("dotenv").config();
const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(
  cors({
    // allow two origins

    origin: "http://localhost:3000" || "*",
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT", "OPTIONS"],
  })
);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const fs = require("fs");
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  res.json({
    message: "File uploaded successfully",
    filename: req.file.filename,
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));

//  for uploading files to the s3 bucket
const AWS = require("aws-sdk");
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

app.post("/upload-s3", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const fileContent = fs.readFileSync(
    `${__dirname}/uploads/${req.file.filename}`
  );
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: req.file.filename,
    Body: fileContent,
  };
  s3.upload(params, (err, data) => {
    if (err) {
      throw err;
    }
    res.json({
      message: "File uploaded successfully",
      filename: req.file.filename,
      location: data.Location,
    });
  });
});
