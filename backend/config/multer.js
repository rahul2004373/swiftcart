import multer from "multer";

const storage = multer.memoryStorage(); // use memory so we can upload directly to cloudinary
const upload = multer({ storage });

export default upload;
