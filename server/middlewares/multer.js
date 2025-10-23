import multer from "multer";

// diskStorage config for multer
const storage = multer.diskStorage({});

// creating upload middleware to parse multi/part formdata
const upload = multer({ storage });

export default upload;
