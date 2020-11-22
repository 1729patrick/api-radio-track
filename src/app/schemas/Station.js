import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const StationSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },
    name: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },
    slug: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },
    order: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },
    countryCode: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },
    langCode: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },
    img: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },
    slogan: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },
    genres: {
      type: [String],
      required: false,
    },
    frecuencies: {
      type: [Object],
      required: false,
    },
    votes: {
      type: {
        up: Number,
        down: Number,
      },
      required: false,
    },
    streams: mongoose.Schema.Types.Mixed,
    address: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },
    description: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },
    mail: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },
    programming: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },
    tel: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },
    twitter: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },
    web: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },
    continentCode: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },
    cityId: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },
    regionId: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },
    whatsapp: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

StationSchema.plugin(paginate);

export default mongoose.model('Station', StationSchema);
