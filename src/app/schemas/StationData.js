import mongoose from 'mongoose';

const StationSchema = new mongoose.Schema(
	{
		continent: {
			type: String,
			required: false,
		},
		// country: {
		// 	type: String,
		// 	required: false,
		// },

		// frequencies: {
		// 	type: String,
		// 	required: false,
		// },
		// genres: {
		// 	type: String,
		// 	required: false,
		// },
		// language: {
		// 	type: String,
		// 	required: false,
		// },
		// station: {
		// 	type: String,
		// 	required: false,
		// },
	},
	{
		timestamps: true,
	}
);

export default mongoose.model('StationData', StationSchema);
