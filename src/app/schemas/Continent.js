import mongoose from 'mongoose';

const ContinentSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: false,
    },
    code: {
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

export default mongoose.model('Continent', ContinentSchema);
