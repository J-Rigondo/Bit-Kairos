import mongoose from 'mongoose';

const Rate = new mongoose.Schema({
  name: {
    type: String
  },
  last: {
    type: Number
  },
  lowestAsk: {
    type: Number
  },
  highestBid: {
    type: Number
  },
  percentChange: {
    type: Number
  },
  baseVolume: {
    type: Number
  },
  quoteVolume: {
    type: Number
  },
  isFrozen: {
    type: Number
  },
  high24hr: {
    type: Number
  },
  low24hr: {
    type: Number
  }
});

Rate.index({ name: 1 }, 'rateTypeIdentifier', { unique: true });

const model = mongoose.model('Rate', Rate);
export default model;
