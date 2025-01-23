import multer from "multer";
import { throwError } from "../utils/ErrorHandler.js";
import fs from "fs";

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		console.log("Uploading file...");

		const fileType = file.mimetype.split("/")[1];
		const id = req.query.id; // Get the ID from query params
		const fieldName = file.fieldname; // Get the field name (e.g., "meeting")

		if (fileType === "mp4" || fileType === "webm" || fileType === "mpeg") {
			console.log("FieldName:", fieldName);
			console.log("ID:", id);

			// Build the path for storing the file on your server
			let path = `./uploads/${fieldName}/id/${id}`;
			if (!fs.existsSync(path)) {
				fs.mkdirSync(path, { recursive: true });
			}

			// Set the destination for multer to save the file
			cb(null, path);
		} else {
			// If the file type is invalid, return an error
			cb(new throwError("Invalid file type", 400));
		}
	},
	filename: (req, file, cb) => {
		// Use the original filename
		cb(null, `${file.originalname}`);
	},
});

export const upload = multer({ storage });
