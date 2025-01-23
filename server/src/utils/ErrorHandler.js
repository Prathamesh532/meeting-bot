import multer from "multer";

class CustomError extends Error {
	constructor(message, statusCode) {
		super(message);
		this.statusCode = statusCode;
		this.message = message;
		Error.captureStackTrace(this, this.constructor);
	}
}

// Error handler for multer
export const multerErrorHandler = (err, req, res, next) => {
	if (err instanceof multer.MulterError) {
		// Handle `multer` specific errors
		console.error("Multer error:", err.message);
		return res.status(400).json({ error: err.message });
	}
	if (err.message === "Invalid file type") {
		// Handle your custom errors
		console.error("Multer error:", err.message);
		return res.status(400).json({ error: err.message });
	}
	// Pass other errors to the next middleware
	next(err);
};

export const asyncErrorHandler = (requestHandler) => {
	return async (req, res, next) => {
		try {
			await requestHandler(req, res, next);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	};
};

export const asyncErrorHandlerByPromise = (requestHandlerCallbackFunc) => {
	(req, res, next) => {
		Promise.resolve(requestHandlerCallbackFunc(req, res, next)).catch((error) =>
			next(error)
		);
	};
};

export const throwError = (message, statusCode) => {
	throw new CustomError(message, statusCode);
};

export const successResponse = (message, data) => {
  //string message and data  object is expected here, cannot wrap successResponse into try catch,as it also throws error to send back response internally
  let resObj = { message: message, data: data };
  throw new CustomError(JSON.stringify(resObj), 200);
};