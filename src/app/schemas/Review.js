import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema(
  {
    starLevel: {
      type: Number,
      required: false,
    },
    notes: {
      type: String,
      required: false,
    },
    deviceId: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Review', ReviewSchema);
