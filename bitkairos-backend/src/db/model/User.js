import mongoose from 'mongoose';

const Wallet = new mongoose.Schema(
  {
    BTC: Number,
    USD: Number,
    KRW: Number
  },
  { _id: false }
);

const User = new mongoose.Schema({
  valid: { type: Boolean, default: false },
  displayName: String,
  email: String,
  social: {
    google: {
      id: String,
      accessToken: String
    }
  },
  password: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  metaInfo: {
    initial: {
      currency: String,
      value: Number
    },
    pinned: [String]
  },
  wallet: {
    type: Wallet,
    default: {
      BTC: 0,
      KRW: 0,
      USD: 0
    }
  }
});

const model = mongoose.model('User', User);
export default model;
