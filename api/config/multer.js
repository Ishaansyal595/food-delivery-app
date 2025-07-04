import multer from "multer";

export const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cd) => {
    return cd(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export default upload;
