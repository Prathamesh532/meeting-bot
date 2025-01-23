import express from "express";
import cors from "cors";
import { upload } from "./src/middlewares/multer.middleware.js";
import {
	asyncErrorHandler,
	multerErrorHandler,
	successResponse,
	throwError,
} from "./src/utils/ErrorHandler.js";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hello To the New World");
});

// app.post(
// 	"/upload",
// 	upload.single("file"),
// 	asyncErrorHandler((req, res) => {
// 		console.log("Body: ", req.body);
// 		console.log("File: ", req.file);
// 		if (!req.file) {
// 			throwError("Please upload a file", 400);
// 		}
// 		successResponse(res, "File uploaded successfully", req.file);
// 	})
// );

// Error Handling Middleware for Multer
app.use(multerErrorHandler);

app.use((err, req, res, next) => {
	res.status(500).json({ error: err.message || "Internal Server Error" });
});

export { app };
