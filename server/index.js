import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./src/db/connection.js";
import { app } from "./app.js";

const PORT = process.env.PORT || 6001

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
