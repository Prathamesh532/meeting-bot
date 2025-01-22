import mongoose from "mongoose";

const summarySchema = new mongoose.Schema(
	{
		meeting_ID: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "meeting",
		},
		content: {
			type: String,
		},
	},
	{ timestamps: true }
);

export const Summary = mongoose.model("Summary", summarySchema);
