import mongoose from 'mongoose';

const RegionSchema = new mongoose.Schema(
  {
    id: {
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

export default mongoose.model('Region', RegionSchema);
