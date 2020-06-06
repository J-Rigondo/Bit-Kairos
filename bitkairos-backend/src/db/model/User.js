import mongoose from 'mongoose';

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
    type: mongoose.Schema.Types.Mixed,
    default: {
      BTC: 0,
      KRW: 0,
      USD: 0
    }
  },
  walletOnOrder: {
    type: mongoose.Schema.Types.Mixed,
    default: {
      BTC: 0,
      USD: 0
    }
  }
});

const model = mongoose.model('User', User);
export default model;
