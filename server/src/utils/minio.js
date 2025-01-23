import dotenv from "dotenv";
dotenv.config();
import * as Minio from "minio";

const minioClient = new Minio.Client({
	endPoint: process.env.MINIO_HOST_URL,
	port: 9000,
	useSSL: false,
	accessKey: process.env.MINIO_ACCESS_KEY,
	secretKey: process.env.MINIO_SECRET_KEY,
});

// Destination bucket
const bucket = "meet-recording";

// Check if the bucket exists
// If it doesn't, create it

const isBucketExist = async () => {
	const exists = await minioClient.bucketExists(bucket);
	if (exists) {
		console.log("Bucket " + bucket + " exists.");
	} else {
		await minioClient.makeBucket(bucket);
		console.log("Bucket " + bucket + " created");
	}
};

const listBuckets = async () => {
	try {
		const buckets = await minioClient.listBuckets();
		console.log("Available Buckets:--> ", buckets);
	} catch (err) {
		console.log(err.message);
	}
};

const removeBucket = async () => {
	try {
		await minioClient.removeBucket(bucket);
		console.log("Bucket " + bucket + " removed");
	} catch (err) {
		console.log(err.message);
	}
};

// // Upload the file with fPutObject
// // If an object with the same name exists,
// // it is updated with new data
const storeFileInMinio = async (fileToUpload) => {
	console.log("storeFileInMinio called");
	console.log("fileName:", fileToUpload.filename);

	// The path in MinIO should be `id/<fileName>`
	const id = fileToUpload.destination.split("/")[4]; // Extract the ID from the folder structure
	const minioPath = `${id}/${fileToUpload.filename}`;

	try {
		// Upload the file to MinIO with the simplified path
		await minioClient.fPutObject(bucket, minioPath, fileToUpload.path, {});
		console.log("File stored in MinIO successfully at path:", minioPath);
	} catch (err) {
		console.log("Error storing file in MinIO:", err.message);
	}
};
const getFileFromMinio = async (response, filePath) => {
	let size = 0;
	minioClient.getObject(bucket, filePath, (err, dataStream) => {
		if (err) return err;
		dataStream.on("data", function (chunk) {
			size += chunk.length;
			// response.write(chunk);
		});
		dataStream.on("end", function () {
			console.log("End. Total size = " + size);
			// response.end();
		});
		dataStream.on("error", function (err) {
			response.status(500).send("Error Getting File from Minio", err);
			return err;
		});
	});
};

const getUrl = async (filePathName) => {
	try {
		return await minioClient.presignedUrl(
			"GET",
			bucket,
			filePathName,
			24 * 60 * 60
		);
	} catch (error) {
		console.error("Error generating URL:", error);
		throw error;
	}
};

export {
	minioClient,
	isBucketExist,
	listBuckets,
	storeFileInMinio,
	getFileFromMinio,
	getUrl,
	removeBucket,
};
