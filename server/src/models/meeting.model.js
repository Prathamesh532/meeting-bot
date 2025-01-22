import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		link: {
			type: String,
			required: true,
			unique: true,
		},
		platform: {
			type: String,
		},
		meetingStartAt: {
			type: Date,
		},
		meetingEndAt: {
			type: Date,
		},
	},
	{ timestamps: true }
);

export const Meeting = mongoose.model("Meeting", meetingSchema);
