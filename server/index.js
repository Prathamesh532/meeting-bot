import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./src/db/connection.js";
import { app } from "./app.js";
import { minioClient } from "./src/utils/minio.js";

const PORT = process.env.PORT || 6001;

// minio connect
try {
	if (minioClient) {
		console.log(
			`Connected to Minio at : http://${minioClient.host}:${minioClient.port}`
		);
	}
} catch (err) {
	console.log("Error Connecting Minio" , err);
}

// connect DB
connectDB()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server is running at: http://localhost:${PORT}`);
		});
	})
	.catch((error) => {
		console.log(`DB Error : ${error}`);
	});
