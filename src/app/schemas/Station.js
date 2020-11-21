import mongoose from 'mongoose';

const StationSchema = new mongoose.Schema(
	{
		id: {
			type: String,
			required: false,
		},
		name: {
			type: String,
			required: false,
		},
		slug: {
			type: String,
			required: false,
		},
		countryCode: {
			type: String,
			required: false,
		},
		langCode: {
			type: String,
			required: false,
		},
		img: {
			type: String,
			required: false,
		},
		slogan: {
			type: String,
			required: false,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model('Station', StationSchema);
