import multer from "multer";
import { throwError } from "../utils/ErrorHandler.js";

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		console.log("uploading file...");
		const fileType = file.mimetype.split("/")[1];
		if (fileType === "mp4" || fileType === "webm" || fileType === "mpeg") {
			cb(null, `./uploads`);
		} else {
            cb(new Error("Invalid file type"));
		}
	},
	filename: (req, file, cb) => {
		cb(null, `${file.originalname}`);
	},
});

export const upload = multer({ storage });
