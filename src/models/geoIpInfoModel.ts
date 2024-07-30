import { Schema } from 'mongoose';

export const geoIpInfoSchema: Schema = new Schema({
  range: {
    type: [Number]
  },
  country: { type: String },
  region: { type: String },
  eu: { type: String },
  timezone: { type: String },
  city: { type: String },
  ll: {
    type: [Number]
  },
  metro: { type: Number },
  area: { type: Number }
}, { _id: false });
