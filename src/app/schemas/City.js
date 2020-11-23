import mongoose from 'mongoose';

const CitySchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: false,
    },
    region: {
      type: String,
      required: false,
    },
    country: {
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('City', CitySchema);
