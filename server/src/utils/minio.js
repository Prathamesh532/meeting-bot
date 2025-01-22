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
const storeFileInMinio = async (fileName, path, metaData) => {
	await minioClient.fPutObject(bucket, fileName, path, metaData);
	console.log(
		"File " + fileName + " uploaded as object " + path + " in bucket " + bucket
	);
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
	isBucketExist,
	listBuckets,
	storeFileInMinio,
	getFileFromMinio,
	getUrl,
};
