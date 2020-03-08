import mongoose from 'mongoose';

const User = new mongoose.Schema({
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
    activated: {
      type: Boolean,
      default: false
    }
  }
});

function findByEmail(email) {
  return this.findOne({ email });
}

const model = mongoose.model('User', User);
export default model;
