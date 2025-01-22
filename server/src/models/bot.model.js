import mongoose from "mongoose";

const botSchema = new mongoose.Schema(
	{
		meeting_ID: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "meeting",
		},
		status: {
			type: String,
			required: true,
			enum: ["active", "inactive", "failed"],
			default: "inactive",
		},
		StartAt: {
			type: Date,
		},
		EndAt: {
			type: Date,
		},
	},
	{ timestamps: true }
);

export const Bot = mongoose.model("Bot", botSchema);
